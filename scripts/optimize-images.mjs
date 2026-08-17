// scripts/optimize-images.mjs
//
// ממיר תמונות PNG/JPG כבדות ב-Assets/ ל-WebP דחוס
// ומדפיס את חיסכון הנפח לכל קובץ.
//
// הפעלה:
//   npm run optimize-images
//
// הקבצים המומרים נשמרים ליד המקור עם סיומת .webp
// (המקור נשמר, ניתן למחוק ידנית אחרי אימות).

import { createReadStream, statSync, readdirSync, mkdirSync } from 'node:fs';
import { join, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '..', 'Assets');
const WEBP_QUALITY = 80; // איכות טובה עם דחיסה גבוהה
const SUPPORTED_EXTS = new Set(['.png', '.jpg', '.jpeg']);

async function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  const { default: sharp } = await import('sharp');

  const files = readdirSync(ASSETS_DIR).filter((f) =>
    SUPPORTED_EXTS.has(extname(f).toLowerCase())
  );

  if (files.length === 0) {
    console.log('לא נמצאו קבצי PNG/JPG ב-Assets/');
    return;
  }

  console.log(`🔍 נמצאו ${files.length} קבצי תמונה ל-Assets/\n`);

  let totalOriginal = 0;
  let totalConverted = 0;

  for (const file of files) {
    const inputPath = join(ASSETS_DIR, file);
    const outputPath = join(ASSETS_DIR, basename(file, extname(file)) + '.webp');

    const originalSize = statSync(inputPath).size;
    totalOriginal += originalSize;

    try {
      await sharp(inputPath)
        .webp({ quality: WEBP_QUALITY, effort: 6 })
        .toFile(outputPath);

      const convertedSize = statSync(outputPath).size;
      totalConverted += convertedSize;
      const saving = (((originalSize - convertedSize) / originalSize) * 100).toFixed(1);
      const originalFmt = await formatBytes(originalSize);
      const convertedFmt = await formatBytes(convertedSize);

      console.log(`✅ ${file}`);
      console.log(`   ${originalFmt} → ${convertedFmt}  (חיסכון: ${saving}%)\n`);
    } catch (err) {
      console.warn(`⚠️  דילוג על ${file}: ${err.message}\n`);
    }
  }

  const totalSaving = (((totalOriginal - totalConverted) / totalOriginal) * 100).toFixed(1);
  console.log('─'.repeat(50));
  console.log(`📦 סה"כ לפני:  ${await formatBytes(totalOriginal)}`);
  console.log(`📦 סה"כ אחרי: ${await formatBytes(totalConverted)}`);
  console.log(`💾 חיסכון כולל: ${totalSaving}%`);
  console.log('\n💡 הקבצים המקוריים נשמרו. לאחר אימות ניתן למחוק אותם ידנית.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
