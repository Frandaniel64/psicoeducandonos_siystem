const fs = require('fs');

const content = fs.readFileSync('src/app/app.html', 'utf8');

const navbarMatch = content.match(/<!-- TopNavBar -->[\s\S]*?<\/header>/);
const footerMatch = content.match(/<!-- Footer -->[\s\S]*?<\/footer>/);
const homeMatch = content.match(/<\/header>([\s\S]*?)<!-- Footer -->/);

if (navbarMatch) fs.writeFileSync('src/app/layout/navbar/navbar.html', navbarMatch[0]);
if (footerMatch) fs.writeFileSync('src/app/layout/footer/footer.html', footerMatch[0]);
if (homeMatch) fs.writeFileSync('src/app/pages/home/home.html', homeMatch[1].trim());

fs.writeFileSync('src/app/app.html', '<app-navbar></app-navbar>\n<router-outlet></router-outlet>\n<app-footer></app-footer>\n');
