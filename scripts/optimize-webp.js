import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

sharp.cache(false);

const targetDirs = ['src/assets/images', 'public/images'];

function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.webp') {
        results.push(filePath);
      }
    }
  }
  return results;
}

function hasImportantText(relPath) {
  const lower = relPath.toLowerCase();
  return lower.includes('achievements') || lower.includes('poster') || lower.includes('webathon') || lower.includes('times-of-india') || lower.includes('hackathon');
}

async function optimizeFile(filePath) {
  try {
    const inputBuffer = fs.readFileSync(filePath);
    const originalSize = inputBuffer.length;

    // Use higher quality 84 for text-heavy images to prevent letter degradation, 80 for photos
    const quality = hasImportantText(filePath) ? 84 : 80;

    const outputBuffer = await sharp(inputBuffer)
      .webp({ quality, effort: 6 })
      .toBuffer();

    // Only overwrite if we save at least 1.5 KB without making it larger
    if (outputBuffer.length < originalSize - 1536) {
      fs.writeFileSync(filePath, outputBuffer);
      const savedBytes = originalSize - outputBuffer.length;
      const savingsPct = (((originalSize - outputBuffer.length) / originalSize) * 100).toFixed(1);
      console.log(`✓ Optimized: ${filePath} (${(originalSize/1024).toFixed(1)} KB -> ${(outputBuffer.length/1024).toFixed(1)} KB | -${savingsPct}% | q${quality})`);
      return { saved: savedBytes, updated: true };
    }
    return { saved: 0, updated: false };
  } catch (err) {
    console.error(`✗ Error optimizing ${filePath}:`, err.message);
    return { saved: 0, updated: false };
  }
}

async function run() {
  console.log(`\n🎨 Starting Safe High-Fidelity WebP Optimization (Conservative q80/q84)...`);
  let totalSaved = 0;
  let totalOptimized = 0;

  for (const dir of targetDirs) {
    console.log(`\nScanning directory: ${dir}`);
    const files = getFilesRecursively(dir);
    for (const file of files) {
      const res = await optimizeFile(file);
      if (res.updated) {
        totalOptimized++;
        totalSaved += res.saved;
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`✨ Successfully optimized ${totalOptimized} image(s)!`);
  console.log(`💾 Total storage saved: ${(totalSaved / 1024).toFixed(1)} KB (${(totalSaved / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`========================================\n`);
}

run();
