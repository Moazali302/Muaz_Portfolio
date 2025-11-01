const fs = require('fs');
const path = require('path');

// Simple sitemap generator
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://moazali.portfolio.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://moazali.portfolio.com/#about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://moazali.portfolio.com/#skills</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://moazali.portfolio.com/#projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://moazali.portfolio.com/#blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://moazali.portfolio.com/#contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

// Write sitemap to frontend public directory
const frontendPublicPath = path.join(__dirname, '../../frontend/portfolio-app/public/sitemap.xml');
fs.writeFileSync(frontendPublicPath, sitemap, 'utf8');
console.log('Sitemap generated successfully at:', frontendPublicPath);

