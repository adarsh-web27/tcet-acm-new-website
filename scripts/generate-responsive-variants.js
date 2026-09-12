import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

sharp.cache(false);

async function generateHero1600() {
  const src = 'public/images/hero-team.webp';
  const dest = 'public/images/hero-team-1600.webp';
  if (fs.existsSync(src)) {
    const inputBuf = fs.readFileSync(src);
    const outBuf = await sharp(inputBuf)
      .resize({ width: 1600 })
      .webp({ quality: 80, effort: 6 })
      .toBuffer();
    fs.writeFileSync(dest, outBuf);
    console.log(`✓ Generated: ${dest} (${(outBuf.length / 1024).toFixed(1)} KB)`);
  }
}

async function generateVariants(dir, widths) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    // Only process base webp files, not existing variants (240, 320, 360, 380, 480, 640, 720, 760, 960, 1600)
    if (!f.endsWith('.webp') || /-(?:240|320|360|380|480|640|720|760|960|1600)\.webp$/.test(f)) continue;

    const fullPath = path.join(dir, f);
    const inputBuf = fs.readFileSync(fullPath);
    const meta = await sharp(inputBuf).metadata();

    for (const w of widths) {
      if (w >= meta.width) continue; // Don't upscale
      const variantPath = fullPath.replace(/\.webp$/, `-${w}.webp`);
      const outBuf = await sharp(inputBuf)
        .resize({ width: w })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();
      fs.writeFileSync(variantPath, outBuf);
      console.log(`✓ Generated: ${variantPath} (${(outBuf.length / 1024).toFixed(1)} KB)`);
    }
  }
}

async function run() {
  console.log('\n🚀 Generating Responsive WebP Image Variants...\n');

  console.log('1. Desktop Hero 1600w Variant:');
  await generateHero1600();

  console.log('\n2. Event Card Variants (380w, 760w):');
  await generateVariants('src/assets/images/events', [380, 760]);

  console.log('\n3. Team Portrait Variants (240w, 480w):');
  await generateVariants('src/assets/images/team', [240, 480]);

  console.log('\n4. Gallery Variants (360w, 720w):');
  await generateVariants('src/assets/images/gallery', [360, 720]);

  console.log('\n✨ Responsive variants generated successfully!\n');
}

run().catch(console.error);
