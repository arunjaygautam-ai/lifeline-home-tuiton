import pngToIco from 'png-to-ico';
import fs from 'fs';
async function run() {
  const buf = await pngToIco(['public/favicon-48x48.png']);
  fs.writeFileSync('test.ico', buf);
  console.log('done');
}
run();
