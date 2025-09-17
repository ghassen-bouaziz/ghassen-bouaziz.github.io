# GitHub Pages Deployment Setup

This guide explains how to deploy your portfolio to GitHub Pages with secure token management.

## 🚀 Overview

Your portfolio is now configured for automated deployment to GitHub Pages using:
- **GitHub Actions** for automated builds and deployment
- **Repository Secrets** for secure token storage
- **Environment Variables** for build-time token injection

## 📁 Files Created/Modified

### 1. `.github/workflows/deploy.yml` (Created)
- Automated deployment workflow
- Builds your site with environment variables
- Deploys to GitHub Pages on every push to main branch

### 2. `package.json` (Updated)
- Added GitHub-specific build scripts
- Enhanced deployment commands

### 3. `build.js` (Enhanced)
- Better GitHub Actions integration
- Improved error messages for missing tokens

## 🔧 Setup Steps

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### Step 2: Configure Repository Secrets

You need to add your tokens as GitHub repository secrets:

1. Go to your repository **Settings**
2. Click **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `MIXPANEL_PROJECT_TOKEN` | Your Mixpanel project token | `abc123def456ghi789` |
| `GTM_CONTAINER_ID` | Google Tag Manager container ID | `GTM-MKMMSLMW` |
| `GA4_MEASUREMENT_ID` | Google Analytics 4 measurement ID | `G-XXXXXXXXXX` |

### Step 3: Update Repository Information

Update your `package.json` with your actual repository details:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
  },
  "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
}
```

### Step 4: Deploy

Push your changes to trigger the deployment:

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

## 🔄 Deployment Process

### Automatic Deployment
- **Trigger**: Every push to `main` or `master` branch
- **Process**: 
  1. GitHub Actions runs the build workflow
  2. Installs dependencies
  3. Builds site with your secret tokens
  4. Deploys to GitHub Pages
- **Result**: Your site is live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

### Manual Deployment
You can also deploy manually:

```bash
# Local development
npm run build
npm run deploy:github

# Or use the standard deploy
npm run deploy
```

## 🛡️ Security Features

### ✅ What's Protected
- **Repository Secrets**: Tokens stored securely in GitHub
- **Environment Variables**: Injected at build time only
- **No Hardcoded Tokens**: Source code remains clean
- **Automatic Deployment**: No manual token handling needed

### ✅ What's Safe
- Tokens are never visible in your code
- Secrets are encrypted in GitHub
- Build process is automated and secure
- Each deployment uses fresh token injection

## 📊 Monitoring Deployments

### Check Deployment Status
1. Go to your repository on GitHub
2. Click **Actions** tab
3. View deployment logs and status
4. Check for any build errors

### Verify Your Site
1. Visit your GitHub Pages URL
2. Open browser developer tools
3. Check console for Mixpanel initialization
4. Verify analytics are working

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build locally with .env.local |
| `npm run build:github` | Build with GitHub Actions syntax |
| `npm run dev` | Local development server |
| `npm run deploy` | Deploy to git (manual) |
| `npm run deploy:github` | Deploy to GitHub Pages |

## 🚨 Troubleshooting

### Build Fails in GitHub Actions
1. **Check repository secrets**: Ensure all required secrets are set
2. **Verify secret names**: Must match exactly (case-sensitive)
3. **Check workflow file**: Ensure `.github/workflows/deploy.yml` exists
4. **Review logs**: Check Actions tab for detailed error messages

### Tokens Not Working
1. **Verify secret values**: Double-check your token values
2. **Check build logs**: Look for token replacement messages
3. **Test locally**: Use `npm run build` to test locally first
4. **Clear cache**: Try pushing a new commit to trigger fresh build

### GitHub Pages Not Updating
1. **Check Pages settings**: Ensure source is set to "GitHub Actions"
2. **Verify workflow**: Check that deploy.yml is in correct location
3. **Check branch**: Ensure you're pushing to main/master branch
4. **Wait for deployment**: GitHub Pages can take a few minutes to update

## 📝 Environment Variables Reference

### GitHub Actions Environment
These are automatically available during GitHub Actions builds:

| Variable | Source | Description |
|----------|--------|-------------|
| `MIXPANEL_PROJECT_TOKEN` | Repository Secret | Your Mixpanel token |
| `GTM_CONTAINER_ID` | Repository Secret | GTM container ID |
| `GA4_MEASUREMENT_ID` | Repository Secret | GA4 measurement ID |
| `GITHUB_ACTIONS` | System | Set to 'true' in GitHub Actions |

### Local Development Environment
These are loaded from `.env.local`:

| Variable | File | Description |
|----------|------|-------------|
| `MIXPANEL_PROJECT_TOKEN` | .env.local | Your Mixpanel token |
| `GTM_CONTAINER_ID` | .env.local | GTM container ID |
| `GA4_MEASUREMENT_ID` | .env.local | GA4 measurement ID |

## 🎯 Best Practices

1. **Never commit secrets**: Keep `.env.local` in `.gitignore`
2. **Use different tokens**: Separate development and production tokens
3. **Regular updates**: Keep your tokens and dependencies updated
4. **Monitor deployments**: Check GitHub Actions for build status
5. **Test locally**: Always test builds locally before pushing

## 🆘 Support

If you encounter issues:

1. **Check GitHub Actions logs** for detailed error messages
2. **Verify repository secrets** are set correctly
3. **Test locally** with `npm run build` first
4. **Check GitHub Pages settings** are configured properly
5. **Review this guide** for common solutions

Your portfolio is now ready for secure, automated deployment to GitHub Pages! 🎉

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Repository Secrets Guide](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitHub Pages Settings](https://github.com/YOUR_USERNAME/YOUR_REPO/settings/pages)
