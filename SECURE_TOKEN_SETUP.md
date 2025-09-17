# Secure Token Setup Guide

This guide explains how to securely store and use your Mixpanel token and other analytics tokens in your portfolio.

## 🔒 Security Implementation

Your portfolio now uses environment variables to securely store sensitive tokens. This prevents them from being exposed in your source code or version control.

## 📁 Files Created/Modified

### 1. `.env.local` (Created)
- Contains your actual tokens and configuration
- **Never commit this file to git** (already in `.gitignore`)
- Replace placeholder values with your real tokens

### 2. `build.js` (Updated)
- Reads environment variables from `.env.local`
- Replaces placeholders in `index.html` with actual values
- Provides build-time token injection

### 3. `.gitignore` (Already configured)
- Excludes all environment files from version control
- Protects your tokens from being accidentally committed

## 🚀 How to Use

### Step 1: Get Your Mixpanel Token
1. Go to [mixpanel.com](https://mixpanel.com)
2. Sign in to your account
3. Select your project
4. Go to Project Settings → Project Token
5. Copy your project token

### Step 2: Update Environment Variables
Edit `.env.local` and replace the placeholder values:

```bash
# Replace this line in .env.local
MIXPANEL_PROJECT_TOKEN=your_actual_mixpanel_token_here

# With your real token (example)
MIXPANEL_PROJECT_TOKEN=abc123def456ghi789
```

### Step 3: Build Your Site
Run the build command to inject your tokens:

```bash
npm run build
```

This will:
- Read your tokens from `.env.local`
- Replace placeholders in `index.html`
- Create a production-ready version

### Step 4: Deploy
Your site is now ready to deploy with secure tokens:

```bash
npm run deploy
```

## 🔧 Available Commands

- `npm run build` - Inject environment variables into HTML
- `npm run dev` - Build and start local development server
- `npm run start` - Start local server (without building)
- `npm run deploy` - Build and deploy to git
- `npm run deploy:github` - Deploy to GitHub Pages

## 🚀 GitHub Pages Deployment

For GitHub Pages deployment, your tokens are stored as **Repository Secrets**:

1. **Add Repository Secrets**:
   - Go to your repo → Settings → Secrets and variables → Actions
   - Add: `MIXPANEL_PROJECT_TOKEN`, `GTM_CONTAINER_ID`, `GA4_MEASUREMENT_ID`

2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: GitHub Actions

3. **Automatic Deployment**:
   - Push to main branch triggers automatic build and deployment
   - Tokens are securely injected during GitHub Actions build

See `GITHUB_PAGES_SETUP.md` for detailed GitHub Pages configuration.

## 🛡️ Security Features

### ✅ What's Protected
- Mixpanel project token
- Google Analytics measurement ID
- GTM container ID
- Any other sensitive configuration

### ✅ What's Safe
- Environment files are gitignored
- Tokens are injected at build time
- No sensitive data in source code
- Production builds are clean

## 🔍 Verification

After building, you can verify your tokens are properly injected:

1. Check the browser console for Mixpanel initialization
2. Verify analytics events are being tracked
3. Confirm no placeholder values remain in the built HTML

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MIXPANEL_PROJECT_TOKEN` | Your Mixpanel project token | `abc123def456ghi789` |
| `GTM_CONTAINER_ID` | Google Tag Manager container ID | `GTM-MKMMSLMW` |
| `GA4_MEASUREMENT_ID` | Google Analytics 4 measurement ID | `G-XXXXXXXXXX` |
| `SITE_URL` | Your site URL | `https://your-domain.com` |

## 🚨 Important Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Keep your tokens private** - Don't share them in public repositories
3. **Use different tokens for different environments** - Development vs production
4. **Regularly rotate your tokens** - For enhanced security

## 🆘 Troubleshooting

### Build fails with "Cannot find module 'dotenv'"
```bash
npm install
```

### Tokens not being replaced
- Check that `.env.local` exists and has the correct variable names
- Ensure you're running `npm run build` before deploying
- Verify the placeholder values in `index.html` match the build script

### Analytics not working
- Verify your tokens are correct in `.env.local`
- Check browser console for initialization errors
- Ensure you've run `npm run build` after updating tokens

## 📞 Support

If you encounter any issues with the secure token setup, check:
1. Your `.env.local` file format
2. The build script output for errors
3. Browser console for JavaScript errors
4. Network tab for failed requests

Your portfolio is now securely configured with environment-based token management! 🎉
