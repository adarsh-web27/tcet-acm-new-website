import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * WebP Image Converter Script
 * 
 * Usage:
 *   node scripts/convert-to-webp.js
 *   node scripts/convert-to-webp.js --dir=src/assets/images
 *   node scripts/convert-to-webp.js --dir=public/images
 *   node scripts/convert-to-webp.js --delete-source
 */

const targetDirs = ['src/assets/images'];
const deleteSource = process.argv.includes('--delete-source');
const quality = 85;

const supportedExts = ['.jpg', '.jpeg', '.png', '.jfif', '.bmp', '.tiff'];

async function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(await getFilesRecursively(filePath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (supportedExts.includes(ext)) {
        results.push(filePath);
      }
    }
  }
  return results;
}

async function convertFileToWebp(filePath) {
  const ext = path.extname(filePath);
  const webpPath = filePath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
  
  try {
    const inputBuffer = fs.readFileSync(filePath);
    const originalSize = inputBuffer.length;
    
    await sharp(inputBuffer)
      .webp({ quality, effort: 6 })
      .toFile(webpPath);
      
    const newSize = fs.statSync(webpPath).size;
    const savings = originalSize > 0 ? (((originalSize - newSize) / originalSize) * 100).toFixed(1) : 0;
    
    console.log(`✓ Converted: ${filePath} -> ${path.basename(webpPath)} (${(originalSize/1024).toFixed(1)} KB -> ${(newSize/1024).toFixed(1)} KB | -${savings}%)`);
    
    if (deleteSource && filePath !== webpPath) {
      fs.unlinkSync(filePath);
      console.log(`  🗑 Deleted source file: ${filePath}`);
    }
  } catch (err) {
    console.error(`✗ Error converting ${filePath}:`, err.message);
  }
}

async function run() {
  console.log('\n🎨 Starting WebP Image Conversion (Quality: ' + quality + ')...');
  
  const customDirArg = process.argv.find(arg => arg.startsWith('--dir='));
  const dirsToScan = customDirArg ? [customDirArg.split('=')[1]] : targetDirs;
  
  let totalConverted = 0;
  for (const dir of dirsToScan) {
    console.log(`\nScanning directory: ${dir}`);
    const files = await getFilesRecursively(dir);
    if (files.length === 0) {
      console.log(`  No PNG/JPG files found in ${dir}`);
      continue;
    }
    for (const file of files) {
      await convertFileToWebp(file);
      totalConverted++;
    }
  }
  
  console.log(`\n✨ Finished converting ${totalConverted} image(s) to WebP format!\n`);
}

run();
