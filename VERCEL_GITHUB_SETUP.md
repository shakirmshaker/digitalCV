# Vercel + GitHub Integration Setup

This guide explains how to set up automatic saving to GitHub when deployed on Vercel.

## How It Works

When deployed on Vercel, the app can automatically commit changes to your GitHub repository. When you save edits, they are pushed directly to your GitHub repo's JSON files.

## Setup Steps

### 1. Create a GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "CV App Vercel"
4. Select the following scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

### 2. Add Environment Variables to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your CV project
3. Go to "Settings" → "Environment Variables"
4. Add the following variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `GITHUB_TOKEN` | Your token from step 1 | Personal access token |
| `GITHUB_OWNER` | `shakirmshaker` | Your GitHub username |
| `GITHUB_REPO` | `nyCV` | Repository name |
| `GITHUB_BRANCH` | `master` | Branch to update |

### 3. Deploy to Vercel

```bash
# If you haven't already installed Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or push to GitHub and let Vercel auto-deploy
git add .
git commit -m "Add GitHub integration for Vercel"
git push
```

### 4. Test the Integration

1. Visit your Vercel deployment URL
2. Log in to the app
3. Click Edit (pencil icon)
4. Make a small change
5. Click Save (disk icon)
6. Check your GitHub repository - you should see a new commit!

## Important Notes

### Security
- **Never commit your GitHub token to the repository**
- The token is stored securely in Vercel's environment variables
- Each save creates a new commit in your repository

### Limitations
- Changes are committed directly to the specified branch
- Each save creates a separate commit (no batching)
- The app needs to be redeployed to see the changes (or wait for auto-deployment)

### Workflow
1. **Edit on Vercel** → Saves to GitHub
2. **GitHub receives commit** → Triggers new Vercel deployment (if configured)
3. **New deployment** → Shows updated content

## Troubleshooting

### "GitHub token not configured" error
- Make sure you added the `GITHUB_TOKEN` environment variable in Vercel
- Redeploy after adding environment variables

### "Failed to update file" error
- Check that your token has `repo` scope
- Verify the repository name and owner are correct
- Ensure the branch name is correct (usually `master` or `main`)

### Changes not showing after save
- Changes are saved to GitHub but require redeployment
- Either:
  - Wait for automatic deployment (if configured)
  - Manually trigger a new deployment in Vercel
  - Use the Download JSON button for immediate local updates

## Alternative: Local Development

For local development without GitHub integration:
```bash
# Run the Express server locally
node server.js

# In another terminal
npm start
```

This saves directly to your local files without GitHub.

## Environment Variables Summary

Create a `.env.local` file for local testing:
```env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=shakirmshaker
GITHUB_REPO=nyCV
GITHUB_BRANCH=master
```

**Remember:** Never commit `.env.local` or any file containing your token!