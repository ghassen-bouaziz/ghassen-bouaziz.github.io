# Ghassen Bouaziz - Portfolio

A modern, responsive portfolio website showcasing my work as a Senior Mobile Developer.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **PWA Ready**: Progressive Web App with offline support
- **Fast Loading**: Optimized for performance
- **SEO Optimized**: Built with SEO best practices
- **Accessible**: WCAG compliant accessibility features

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Inter (Google Fonts)
- **PWA**: Service Worker, Web App Manifest

## Sections

1. **Hero**: Introduction with key statistics
2. **About**: Professional background and highlights
3. **Skills**: Technical skills organized by category
4. **Experience**: Professional work history timeline
5. **Projects**: Featured portfolio projects
6. **Contact**: Contact form and information

## Getting Started

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy environment file: `cp env.example .env.local`
4. Update `.env.local` with your actual tokens
5. Build and serve: `npm run dev`

### Production Deployment

1. Set up GitHub Secrets (see `GITHUB_SECRETS_SETUP.md`)
2. Push to main branch
3. GitHub Actions will automatically deploy

### Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp env.example .env.local
# Edit .env.local with your tokens

# Build and serve locally
npm run dev
```

## 🔐 Environment Variables

Create `.env.local` file with your tokens:

```bash
MIXPANEL_PROJECT_TOKEN=your_mixpanel_token_here
GTM_CONTAINER_ID=GTM-MKMMSLMW
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
SITE_URL=https://your-domain.com
```

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
├── files/             # CV files
│   ├── Bouaziz-Ghassen-EN.pdf
│   └── Bouaziz-Ghassen-FR.pdf
├── browserconfig.xml   # Browser configuration
├── robots.txt         # SEO robots file
└── sitemap.xml        # SEO sitemap
```

## Customization

- Update personal information in `index.html`
- Modify colors and styling in `styles.css` CSS variables
- Add or remove projects in the projects section
- Update CV files in the `files/` directory

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## License

© 2024 Ghassen Bouaziz. All rights reserved.