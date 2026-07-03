import sharp from 'sharp';
async function run() {
  await sharp('public/logo.png').resize(48, 48).toFile('test.png');
}
run();
