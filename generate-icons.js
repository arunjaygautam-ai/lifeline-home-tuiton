import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import fs from 'fs';

async function processIcons() {
  const inputPath = 'public/logo.png';
  try {
    const img = sharp(inputPath);
    
    // sizes for ico (legacy and desktop browsers)
    // 16x16, 32x32, and 48x48 are the most standard sizes for favicon.ico
    const icoSizes = [16, 32, 48];
    const icoPngFiles = [];
    for (const size of icoSizes) {
      const outPath = `public/temp-${size}x${size}.png`;
      await img.clone()
        .resize(size, size, { fit: 'contain', background: {r:255,g:255,b:255,alpha:0} })
        .toFile(outPath);
      icoPngFiles.push(outPath);
    }

    // Create standard favicon.ico
    const buf = await pngToIco(icoPngFiles);
    fs.writeFileSync('public/favicon.ico', buf);

    // cleanup temp pngs
    for (const file of icoPngFiles) {
      fs.unlinkSync(file);
    }

    // sizes for HTML/manifest (Android/Chrome/Modern Web)
    const webSizes = [192, 512];
    for (const size of webSizes) {
      const outPath = `public/favicon-${size}x${size}.png`;
      await img.clone()
        .resize(size, size, { fit: 'contain', background: {r:255,g:255,b:255,alpha:0} })
        .toFile(outPath);
    }
    
    // Create standard apple-touch-icon (iOS)
    await img.clone()
      .resize(180, 180, { fit: 'contain', background: {r:255,g:255,b:255,alpha:0} })
      .toFile(`public/apple-touch-icon.png`);

    console.log('Icons generated successfully!');
  } catch (err) {
    console.error(err);
  }
}
processIcons();
