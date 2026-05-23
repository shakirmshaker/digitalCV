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
    const GITHUB_REPO = process.env.GITHUB_REPO || 'digitalCV';
    const BRANCH = process.env.GITHUB_BRANCH || 'master';

    if (!GITHUB_TOKEN) {
      console.error('GitHub token not configured');
      return res.status(500).json({
        error: 'GitHub token not configured',
        message: 'Please set GITHUB_TOKEN environment variable in Vercel'
      });
    }

    const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;
    const filePath = 'src/data/cvData.json';

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
      return res.status(500).json({
        success: false,
        message: `Failed to get ${filePath}: ${getFileResponse.status}`
      });
    }

    const fileData = await getFileResponse.json();
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
          sha: fileData.sha,
          branch: BRANCH
        })
      }
    );

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error(`Failed to update ${filePath}:`, errorText);
      return res.status(500).json({
        success: false,
        message: `Failed to update ${filePath}: ${updateResponse.status}`
      });
    }

    const updateResult = await updateResponse.json();
    console.log(`Successfully updated ${filePath}`);

    return res.status(200).json({
      success: true,
      message: 'CV data saved successfully to GitHub',
      updated: { path: filePath, commit: updateResult.commit.sha }
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      error: 'Failed to save data',
      message: error.message
    });
  }
}