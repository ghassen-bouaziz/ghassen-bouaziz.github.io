#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load environment variables (fallback to .env.local for local development)
try {
  require('dotenv').config({ path: '.env.local' });
} catch (error) {
  console.log('📝 Using environment variables from GitHub Actions or system');
}

console.log('🔧 Building portfolio with environment variables...');

// Read index.html
let html = fs.readFileSync('index.html', 'utf8');

// Replace tokens with environment variables
const replacements = {
    'YOUR_MIXPANEL_PROJECT_TOKEN': process.env.MIXPANEL_PROJECT_TOKEN || 'YOUR_MIXPANEL_PROJECT_TOKEN',
    'GTM-MKMMSLMW': process.env.GTM_CONTAINER_ID || 'GTM-MKMMSLMW',
    'GA_MEASUREMENT_ID': process.env.GA4_MEASUREMENT_ID || 'GA_MEASUREMENT_ID'
};

// Perform replacements
Object.entries(replacements).forEach(([placeholder, value]) => {
    const regex = new RegExp(placeholder, 'g');
    html = html.replace(regex, value);
    
    if (value !== placeholder) {
        console.log(`✅ Replaced ${placeholder} with ${value.substring(0, 10)}...`);
    } else {
        console.log(`⚠️  ${placeholder} not found in environment variables`);
        if (process.env.GITHUB_ACTIONS) {
            console.log(`   💡 Make sure to set this as a GitHub repository secret`);
        } else {
            console.log(`   💡 Add this to your .env.local file for local development`);
        }
    }
});

// Write updated HTML
fs.writeFileSync('index.html', html);

console.log('✅ Build completed successfully!');
console.log('📁 Updated index.html with environment variables');
