# GitHub Secrets Setup Guide

This guide explains how to use GitHub Secrets to securely store your Mixpanel token and other sensitive data for your portfolio.

## Overview

GitHub Secrets allow you to store sensitive information like API keys, tokens, and passwords securely. These secrets are encrypted and can only be accessed by authorized users and GitHub Actions.

## Benefits

- **Security**: Tokens are encrypted and not visible in your code
- **Access Control**: Only authorized users can view secrets
- **Environment Management**: Different secrets for different environments
- **CI/CD Integration**: Use secrets in GitHub Actions workflows
- **Audit Trail**: Track when secrets are accessed or modified

## Setting Up GitHub Secrets

### 1. Access Repository Settings

1. Go to your GitHub repository
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**

### 2. Create New Secrets

Click **New repository secret** and add these secrets:

#### **MIXPANEL_PROJECT_TOKEN**
- **Name**: `MIXPANEL_PROJECT_TOKEN`
- **Value**: Your actual Mixpanel project token
- **Description**: Mixpanel analytics project token

#### **GTM_CONTAINER_ID**
- **Name**: `GTM_CONTAINER_ID`
- **Value**: `GTM-MKMMSLMW`
- **Description**: Google Tag Manager container ID

#### **GA4_MEASUREMENT_ID**
- **Name**: `GA4_MEASUREMENT_ID`
- **Value**: Your GA4 measurement ID (e.g., `G-XXXXXXXXXX`)
- **Description**: Google Analytics 4 measurement ID

#### **SITE_URL**
- **Name**: `SITE_URL`
- **Value**: `https://your-portfolio-domain.com`
- **Description**: Your portfolio website URL

## Environment-Specific Secrets

### Development Environment
- **MIXPANEL_PROJECT_TOKEN_DEV**: Development Mixpanel token
- **GA4_MEASUREMENT_ID_DEV**: Development GA4 ID

### Production Environment
- **MIXPANEL_PROJECT_TOKEN_PROD**: Production Mixpanel token
- **GA4_MEASUREMENT_ID_PROD**: Production GA4 ID

## Using Secrets in GitHub Actions

### 1. Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build with secrets
      env:
        MIXPANEL_PROJECT_TOKEN: ${{ secrets.MIXPANEL_PROJECT_TOKEN }}
        GTM_CONTAINER_ID: ${{ secrets.GTM_CONTAINER_ID }}
        GA4_MEASUREMENT_ID: ${{ secrets.GA4_MEASUREMENT_ID }}
        SITE_URL: ${{ secrets.SITE_URL }}
      run: |
        # Replace tokens in files
        sed -i "s/YOUR_MIXPANEL_PROJECT_TOKEN/$MIXPANEL_PROJECT_TOKEN/g" index.html
        sed -i "s/GTM-XXXXXXX/$GTM_CONTAINER_ID/g" index.html
        sed -i "s/GA_MEASUREMENT_ID/$GA4_MEASUREMENT_ID/g" index.html
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

### 2. Environment-Specific Deployment

```yaml
name: Deploy to Environment

on:
  push:
    branches: [ main, develop ]

jobs:
  deploy-dev:
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    environment: development
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Deploy to Development
      env:
        MIXPANEL_PROJECT_TOKEN: ${{ secrets.MIXPANEL_PROJECT_TOKEN_DEV }}
        GA4_MEASUREMENT_ID: ${{ secrets.GA4_MEASUREMENT_ID_DEV }}
      run: |
        # Development deployment logic
        
  deploy-prod:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Deploy to Production
      env:
        MIXPANEL_PROJECT_TOKEN: ${{ secrets.MIXPANEL_PROJECT_TOKEN_PROD }}
        GA4_MEASUREMENT_ID: ${{ secrets.GA4_MEASUREMENT_ID_PROD }}
      run: |
        # Production deployment logic
```

## Local Development Setup

### 1. Create Environment File

Create `.env.local` (add to `.gitignore`):

```bash
# Analytics Tokens
MIXPANEL_PROJECT_TOKEN=your_mixpanel_token_here
GTM_CONTAINER_ID=GTM-MKMMSLMW
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
SITE_URL=http://localhost:8000

# Development Settings
NODE_ENV=development
DEBUG=true
```

### 2. Update .gitignore

Add to `.gitignore`:

```gitignore
# Environment files
.env
.env.local
.env.development
.env.production
.env.test

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
```

### 3. Create Build Script

Create `build.js`:

```javascript
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Read index.html
let html = fs.readFileSync('index.html', 'utf8');

// Replace tokens with environment variables
html = html.replace('YOUR_MIXPANEL_PROJECT_TOKEN', process.env.MIXPANEL_PROJECT_TOKEN || 'YOUR_MIXPANEL_PROJECT_TOKEN');
html = html.replace('GTM-XXXXXXX', process.env.GTM_CONTAINER_ID || 'GTM-XXXXXXX');
html = html.replace('GA_MEASUREMENT_ID', process.env.GA4_MEASUREMENT_ID || 'GA_MEASUREMENT_ID');

// Write updated HTML
fs.writeFileSync('index.html', html);

console.log('✅ Tokens replaced successfully');
```

### 4. Update package.json

```json
{
  "name": "portfolio",
  "version": "1.0.0",
  "scripts": {
    "build": "node build.js",
    "dev": "npm run build && python3 -m http.server 8000",
    "deploy": "npm run build && git add . && git commit -m 'Deploy with secrets' && git push"
  },
  "devDependencies": {
    "dotenv": "^16.0.0"
  }
}
```

## Security Best Practices

### 1. Secret Rotation

- **Regular Updates**: Rotate secrets every 90 days
- **Immediate Rotation**: Rotate if compromised
- **Version Control**: Keep track of secret versions

### 2. Access Control

- **Least Privilege**: Only give access to necessary users
- **Environment Separation**: Different secrets for different environments
- **Audit Logs**: Monitor secret access

### 3. Secret Management

- **No Hardcoding**: Never commit secrets to code
- **Environment Variables**: Use environment variables for local development
- **Secure Storage**: Use GitHub Secrets for CI/CD

### 4. Monitoring

- **Access Logs**: Monitor who accesses secrets
- **Usage Tracking**: Track when secrets are used
- **Anomaly Detection**: Alert on unusual access patterns

## Troubleshooting

### Common Issues:

1. **Secret not found**: Check secret name and repository access
2. **Permission denied**: Verify user has access to secrets
3. **Environment mismatch**: Ensure correct environment secrets
4. **Token expired**: Check if token is still valid

### Debug Steps:

1. **Check Secret Names**: Ensure exact match with workflow
2. **Verify Permissions**: Check repository settings
3. **Test Locally**: Use environment variables for testing
4. **Check Logs**: Review GitHub Actions logs

## Migration from Hardcoded Tokens

### 1. Identify Hardcoded Tokens

Search your codebase for:
- `YOUR_MIXPANEL_PROJECT_TOKEN`
- `GTM-XXXXXXX`
- `GA_MEASUREMENT_ID`

### 2. Replace with Environment Variables

```javascript
// Before
mixpanel.init('YOUR_MIXPANEL_PROJECT_TOKEN');

// After
mixpanel.init(process.env.MIXPANEL_PROJECT_TOKEN || 'YOUR_MIXPANEL_PROJECT_TOKEN');
```

### 3. Update Build Process

```bash
# Add to build script
sed -i "s/YOUR_MIXPANEL_PROJECT_TOKEN/$MIXPANEL_PROJECT_TOKEN/g" index.html
```

### 4. Test Deployment

1. **Local Testing**: Use `.env.local` file
2. **CI/CD Testing**: Use GitHub Actions
3. **Production Testing**: Verify tokens work in production

## Summary

GitHub Secrets provide secure token management:
- ✅ **Secure Storage**: Encrypted token storage
- ✅ **Access Control**: Granular permission management
- ✅ **Environment Separation**: Different secrets for different environments
- ✅ **CI/CD Integration**: Seamless deployment workflows
- ✅ **Audit Trail**: Track secret access and usage
- ✅ **Best Practices**: Follow security best practices

This setup ensures your sensitive tokens are secure while maintaining easy deployment and development workflows.
