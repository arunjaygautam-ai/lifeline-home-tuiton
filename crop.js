const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  try {
    const inputPath = 'public/logo.png';
    const outputPath = 'public/logo-cropped.png';
    
    await sharp(inputPath)
      .trim()
      .toFile(outputPath);
      
    fs.copyFileSync(outputPath, inputPath);
    console.log('Image successfully cropped');
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

processImage();
