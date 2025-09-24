// Vercel serverless function to save CV data to GitHub
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const cvData = req.body;

    // GitHub configuration from environment variables
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_OWNER = process.env.GITHUB_OWNER || 'shakirmshaker';
    const GITHUB_REPO = process.env.GITHUB_REPO || 'nyCV';
    const BRANCH = process.env.GITHUB_BRANCH || 'master';

    if (!GITHUB_TOKEN) {
      console.error('GitHub token not configured');
      return res.status(500).json({
        error: 'GitHub token not configured',
        message: 'Please set GITHUB_TOKEN environment variable in Vercel'
      });
    }

    // GitHub API base URL
    const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;

    // Paths to update (both files)
    const filePaths = [
      'src/data/cvData.json',
      'public/data/cvData.json'
    ];

    const updatedFiles = [];
    const errors = [];

    // Update each file
    for (const filePath of filePaths) {
      try {
        // Step 1: Get the current file to get its SHA
        const getFileResponse = await fetch(
          `${baseUrl}/contents/${filePath}?ref=${BRANCH}`,
          {
            headers: {
              'Authorization': `Bearer ${GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
            }
          }
        );

        if (!getFileResponse.ok) {
          const errorText = await getFileResponse.text();
          console.error(`Failed to get ${filePath}:`, errorText);
          errors.push(`Failed to get ${filePath}: ${getFileResponse.status}`);
          continue;
        }

        const fileData = await getFileResponse.json();
        const currentSha = fileData.sha;

        // Step 2: Update the file
        const content = Buffer.from(JSON.stringify(cvData, null, 2)).toString('base64');

        const updateResponse = await fetch(
          `${baseUrl}/contents/${filePath}`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: `Update CV data via web interface`,
              content: content,
              sha: currentSha,
              branch: BRANCH
            })
          }
        );

        if (!updateResponse.ok) {
          const errorText = await updateResponse.text();
          console.error(`Failed to update ${filePath}:`, errorText);
          errors.push(`Failed to update ${filePath}: ${updateResponse.status}`);
          continue;
        }

        const updateResult = await updateResponse.json();
        updatedFiles.push({
          path: filePath,
          commit: updateResult.commit.sha
        });

        console.log(`Successfully updated ${filePath}`);
      } catch (error) {
        console.error(`Error updating ${filePath}:`, error);
        errors.push(`Error updating ${filePath}: ${error.message}`);
      }
    }

    // Return appropriate response
    if (updatedFiles.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update any files',
        errors: errors
      });
    }

    if (errors.length > 0) {
      return res.status(207).json({
        success: true,
        message: `Partially updated: ${updatedFiles.length} file(s) successful`,
        updated: updatedFiles,
        errors: errors
      });
    }

    return res.status(200).json({
      success: true,
      message: 'CV data saved successfully to GitHub',
      updated: updatedFiles
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      error: 'Failed to save data',
      message: error.message
    });
  }
}