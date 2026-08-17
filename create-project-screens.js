import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projects = [
  { screen: 'screen 1.png', project: 'resumes builder website.png', output: 'project-screen-1.png' },
  { screen: 'screen 2.png', project: 'benji website.png', output: 'project-screen-2.png' },
  { screen: 'screen 3.png', project: 'refael website.png', output: 'project-screen-3.png' },
  { screen: 'screen 4.png', project: 'atliz website.png', output: 'project-screen-4.png' },
  { screen: 'screen 5.png', project: 'camps website.png', output: 'project-screen-5.png' },
  { screen: 'screen 6.png', project: 'color game website.png', output: 'project-screen-6.png' },
  { screen: 'screen 1.png', project: 'portfolio website.png', output: 'project-screen-7.png' }
];

async function createProjectScreen(screenPath, projectPath, outputPath) {
  try {
    // Read the screen background
    const screenImage = sharp(screenPath);
    const screenMeta = await screenImage.metadata();
    
    // Calculate the position and size for the project image on the screen
    // Based on typical screen mockup proportions - adjust these values as needed
    const screenWidth = screenMeta.width;
    const screenHeight = screenMeta.height;
    
    // These values position the project image in the center of the screen area
    // Adjust based on your actual screen mockup dimensions
    const projectWidth = Math.floor(screenWidth * 0.42);  // 42% of screen width
    const projectHeight = Math.floor(screenHeight * 0.62); // 62% of screen height
    const left = Math.floor((screenWidth - projectWidth) / 2);
    const top = Math.floor((screenHeight - projectHeight) / 2) - Math.floor(screenHeight * 0.03); // -3% offset
    
    // Resize and prepare the project image
    const resizedProject = await sharp(projectPath)
      .resize(projectWidth, projectHeight, {
        fit: 'cover',
        position: 'center'
      })
      .toBuffer();
    
    // Composite the project image onto the screen
    await screenImage
      .composite([
        {
          input: resizedProject,
          top: top,
          left: left
        }
      ])
      .toFile(outputPath);
    
    console.log(`✅ Created: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error creating ${outputPath}:`, error.message);
  }
}

async function main() {
  const assetsDir = path.join(__dirname, 'Assets');
  
  console.log('🎨 Creating project screen images...\n');
  
  for (const project of projects) {
    const screenPath = path.join(assetsDir, project.screen);
    const projectPath = path.join(assetsDir, project.project);
    const outputPath = path.join(assetsDir, project.output);
    
    if (!fs.existsSync(screenPath)) {
      console.error(`❌ Screen image not found: ${project.screen}`);
      continue;
    }
    
    if (!fs.existsSync(projectPath)) {
      console.error(`❌ Project image not found: ${project.project}`);
      continue;
    }
    
    await createProjectScreen(screenPath, projectPath, outputPath);
  }
  
  console.log('\n✨ All done!');
}

main();
