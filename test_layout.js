const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/admin/dashboard/artists', { waitUntil: 'networkidle0' });
  
  const navbar = await page.$('header');
  if (navbar) {
    const box = await navbar.boundingBox();
    console.log('Navbar found:', box);
  } else {
    console.log('No navbar found.');
  }
  
  const h1 = await page.$('h1');
  if (h1) {
    const box = await h1.boundingBox();
    console.log('H1 found:', box);
  }
  
  await browser.close();
})();
