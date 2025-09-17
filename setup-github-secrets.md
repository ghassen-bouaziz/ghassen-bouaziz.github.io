# Quick GitHub Secrets Setup

## 🔐 Required Repository Secrets

Add these secrets to your GitHub repository:

### 1. Go to Repository Settings
- Navigate to: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions`
- Click **"New repository secret"**

### 2. Add These Secrets

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `MIXPANEL_PROJECT_TOKEN` | `your_actual_mixpanel_token` | Your Mixpanel project token |
| `GTM_CONTAINER_ID` | `GTM-MKMMSLMW` | Your GTM container ID |
| `GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Your GA4 measurement ID |

### 3. Enable GitHub Pages
- Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/pages`
- Source: **GitHub Actions**
- Save

### 4. Deploy
```bash
git add .
git commit -m "Setup GitHub Pages with secure tokens"
git push origin main
```

## ✅ Verification

After deployment, check:
1. **Actions tab**: Build should succeed
2. **Pages tab**: Site should be live
3. **Browser console**: Mixpanel should initialize
4. **Analytics**: Events should be tracked

Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO`
