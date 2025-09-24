// Vercel serverless function to fetch CV data directly from GitHub
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // GitHub configuration from environment variables
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_OWNER = process.env.GITHUB_OWNER || 'shakirmshaker';
    const GITHUB_REPO = process.env.GITHUB_REPO || 'digitalCV';
    const BRANCH = process.env.GITHUB_BRANCH || 'master';

    if (!GITHUB_TOKEN) {
      console.error('GitHub token not configured');
      // Fallback to fetching from public URL if no token
      try {
        const publicUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${BRANCH}/src/data/cvData.json`;
        const response = await fetch(publicUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch from public URL: ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);
      } catch (fallbackError) {
        return res.status(500).json({
          error: 'GitHub token not configured and public fetch failed',
          message: fallbackError.message
        });
      }
    }

    // GitHub API URL for the file
    const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/src/data/cvData.json?ref=${BRANCH}`;

    // Fetch the file from GitHub
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch from GitHub API:`, errorText);

      // Fallback to raw GitHub URL
      const publicUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${BRANCH}/src/data/cvData.json`;
      const fallbackResponse = await fetch(publicUrl);

      if (!fallbackResponse.ok) {
        throw new Error(`Both API and public fetch failed`);
      }

      const data = await fallbackResponse.json();
      return res.status(200).json(data);
    }

    const fileData = await response.json();

    // Decode the base64 content
    const content = Buffer.from(fileData.content, 'base64').toString('utf8');
    const cvData = JSON.parse(content);

    // Add metadata about the fetch
    cvData._metadata = {
      fetchedAt: new Date().toISOString(),
      source: 'github-api',
      sha: fileData.sha
    };

    // Set cache headers to prevent caching
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    return res.status(200).json(cvData);

  } catch (error) {
    console.error('Error fetching CV data from GitHub:', error);
    return res.status(500).json({
      error: 'Failed to fetch CV data',
      message: error.message
    });
  }
}