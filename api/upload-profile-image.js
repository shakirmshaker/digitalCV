// Vercel serverless function to upload profile image to GitHub
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
    const { imageData } = req.body;

    if (!imageData) {
      return res.status(400).json({ error: 'No image data provided' });
    }

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

    // GitHub API base URL
    const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;
    const filePath = 'public/images/profile.jpg';

    // Extract base64 content from data URL if present
    let base64Content = imageData;
    if (imageData.includes(',')) {
      base64Content = imageData.split(',')[1];
    }

    // Step 1: Try to get the current file to get its SHA (file might not exist)
    let currentSha = null;
    try {
      const getFileResponse = await fetch(
        `${baseUrl}/contents/${filePath}?ref=${BRANCH}`,
        {
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );

      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        currentSha = fileData.sha;
      }
    } catch (error) {
      console.log('File does not exist yet, will create new');
    }

    // Step 2: Create or update the file
    const updateBody = {
      message: 'Update profile image via web interface',
      content: base64Content,
      branch: BRANCH
    };

    if (currentSha) {
      updateBody.sha = currentSha;
    }

    const updateResponse = await fetch(
      `${baseUrl}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateBody)
      }
    );

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error('Failed to upload image:', errorText);
      return res.status(500).json({
        success: false,
        error: 'Failed to upload image to GitHub',
        details: errorText
      });
    }

    const updateResult = await updateResponse.json();
    console.log('Successfully uploaded profile image');

    return res.status(200).json({
      success: true,
      message: 'Profile image uploaded successfully to GitHub',
      commit: updateResult.commit.sha
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      error: 'Failed to upload image',
      message: error.message
    });
  }
}
