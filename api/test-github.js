// Test endpoint to verify GitHub configuration
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_OWNER = process.env.GITHUB_OWNER || 'shakirmshaker';
  const GITHUB_REPO = process.env.GITHUB_REPO || 'nyCV';

  const status = {
    configured: false,
    tokenSet: false,
    repoAccessible: false,
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    message: ''
  };

  if (!GITHUB_TOKEN) {
    status.message = 'GitHub token not configured in environment variables';
    return res.status(200).json(status);
  }

  status.tokenSet = true;

  try {
    // Test GitHub API access
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    );

    if (response.ok) {
      const repoData = await response.json();
      status.configured = true;
      status.repoAccessible = true;
      status.message = `Successfully connected to ${repoData.full_name}`;
      status.defaultBranch = repoData.default_branch;
    } else {
      status.message = `Failed to access repository: ${response.status} ${response.statusText}`;
    }
  } catch (error) {
    status.message = `Error connecting to GitHub: ${error.message}`;
  }

  return res.status(200).json(status);
}