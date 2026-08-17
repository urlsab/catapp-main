import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function addTextToImage() {
  try {
    const assetsDir = path.join(__dirname, 'Assets');
    const inputPath = path.join(assetsDir, 'build cv.png');
    const outputPath = path.join(assetsDir, 'build cv.png');
    
    // Read the original image
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    const width = metadata.width;
    const height = metadata.height;
    
    // Create SVG with Hebrew text centered
    const fontSize = Math.floor(width * 0.15); // Dynamic font size based on image width
    const svgText = `
      <svg width="${width}" height="${height}">
        <defs>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@700&amp;display=swap');
          </style>
        </defs>
        <rect width="${width}" height="${height}" fill="rgba(0, 0, 0, 0.5)"/>
        <text
          x="50%"
          y="50%"
          font-family="Heebo, Arial, sans-serif"
          font-size="${fontSize}"
          font-weight="700"
          fill="white"
          text-anchor="middle"
          dominant-baseline="middle"
          style="text-shadow: 2px 2px 8px rgba(0,0,0,0.8);"
        >עריכת קו"ח</text>
      </svg>
    `;
    
    // Composite the SVG onto the image
    await image
      .composite([
        {
          input: Buffer.from(svgText),
          top: 0,
          left: 0
        }
      ])
      .toFile(outputPath);
    
    console.log('✅ הטקסט נוסף בהצלחה לתמונה!');
  } catch (error) {
    console.error('❌ שגיאה:', error.message);
  }
}

addTextToImage();
