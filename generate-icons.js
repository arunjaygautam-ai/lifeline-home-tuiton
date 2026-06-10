import sharp from 'sharp';

async function processIcons() {
  const inputPath = 'public/logo.png';
  try {
    const trimmed = sharp(inputPath).trim();
    
    const sizes = [48, 96, 144, 192, 512];
    for (const size of sizes) {
      await trimmed.resize(size, size, { fit: 'contain', background: {r:255,g:255,b:255,alpha:0} })
        .toFile(`public/favicon-${size}x${size}.png`);
    }
    
    // Create apple-touch-icon
    await trimmed.resize(180, 180, { fit: 'contain', background: {r:255,g:255,b:255,alpha:0} })
      .toFile(`public/apple-touch-icon.png`);

    console.log('Icons generated');
  } catch (err) { console.error(err); }
}
processIcons();
