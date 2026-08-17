// scripts/prerender.mjs
//
// פותר את הבעיה הקריטית: כרגע vercel.json מנתב כל נתיב (/pricing, /portfolio וכו')
// לאותו index.html, כך שבוט שלא מריץ JavaScript (כמו רוב בוטי ה-AI: GPTBot,
// PerplexityBot, ולעיתים גם סורקי SEO קלאסיים) רואה תוכן זהה בכל עמוד באתר.
//
// הסקריפט הזה, שרץ אחרי "vite build", פותח כל נתיב בדפדפן headless אמיתי,
// ממתין שה-JS ירוץ (usePageSeo יעדכן title/meta/schema), ואז שומר את ה-HTML
// המלא כקובץ סטטי בנתיב המתאים (dist/pricing/index.html וכו').
//
// Vercel מגיש קבצים סטטיים קיימים לפני שהוא מפעיל rewrites, כך שברגע
// שהקבצים האלה קיימים ב-dist, כל בוט (עם JS או בלי) יקבל HTML נכון ומלא
// לכל עמוד - בלי לשנות שום דבר ב-vercel.json.
//
// הפעלה חד-פעמית:
//   npm install --save-dev puppeteer serve
//   node scripts/prerender.mjs
//
// כדי שזה ירוץ אוטומטית בכל דיפלוי, הוסיפו ל-package.json:
//   "scripts": { "postbuild": "node scripts/prerender.mjs" }

import { execSync, spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');
const PORT = 4173;

// כל הנתיבים הציבוריים באתר (בהתאם ל-App.tsx / sitemap.xml)
const ROUTES = [
  '/',
  '/pricing',
  '/portfolio',
  '/about-full',
  '/testimonials',
  '/contact',
  '/faq',
  '/articles',
  '/quote',
];

async function main() {
  if (!existsSync(DIST_DIR)) {
    console.error('❌ תיקיית dist לא נמצאה - הריצו קודם: npm run build');
    process.exit(1);
  }

  const { default: puppeteer } = await import('puppeteer');

  // מגישים את ה-build המקומי כדי שהדפדפן יוכל לטעון אותו
  const serveProcess = spawn('npx', ['serve', DIST_DIR, '-l', String(PORT), '-s'], {
    stdio: 'ignore',
    shell: true,
  });

  await new Promise((r) => setTimeout(r, 2000)); // המתנה לעליית השרת

  const browser = await puppeteer.launch({ headless: true });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      const url = `http://localhost:${PORT}${route}`;
      await page.goto(url, { waitUntil: 'networkidle0' });

      // ודאו שה-hook usePageSeo כבר עדכן את ה-<head> לפני צילום ה-HTML
      await page.waitForSelector('script[data-page-schema]', { timeout: 5000 }).catch(() => {});

      const html = await page.content();
      await page.close();

      const outDir = route === '/' ? DIST_DIR : join(DIST_DIR, route.slice(1));
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, 'index.html'), html, 'utf-8');
      console.log(`✅ נוצר HTML סטטי עבור ${route}`);
    }
  } finally {
    await browser.close();
    serveProcess.kill();
  }

  console.log('\n✨ סיום - כל 9 הנתיבים כוללים כעת HTML סטטי ומלא לבוטים.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
