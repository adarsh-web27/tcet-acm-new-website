import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

sharp.cache(false);

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
      results.push(filePath);
    }
  }
  return results;
}

function classifyRole(relPath) {
  const lower = relPath.toLowerCase();
  if (lower.includes('hero')) return 'Hero';
  if (lower.includes('logo')) return 'Logo';
  if (lower.includes('ambient') || lower.includes('backdrop') || lower.includes('bg')) return 'Background';
  if (lower.includes('team') || lower.includes('who-we-are')) return 'Portrait Card';
  if (lower.includes('achievements')) return 'Achievement Card / Certificate';
  if (lower.includes('events')) return 'Event Poster / Card';
  if (lower.includes('gallery')) return 'Gallery Card';
  return 'General Asset';
}

function hasImportantText(relPath) {
  const lower = relPath.toLowerCase();
  return lower.includes('achievements') || lower.includes('poster') || lower.includes('webathon') || lower.includes('times-of-india') || lower.includes('hackathon');
}

async function run() {
  const images = [...getFilesRecursively('src/assets/images'), ...getFilesRecursively('public/images')]
    .filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f));

  const srcCodeFiles = getFilesRecursively('src').filter(f => /\.(jsx?|tsx?|html|css|json)$/.test(f));
  const codeContents = srcCodeFiles.map(f => ({ file: path.basename(f), content: fs.readFileSync(f, 'utf8') }));

  const rows = [];

  for (const imgPath of images) {
    const relPath = imgPath.replace(/\\/g, '/');
    const baseName = path.basename(imgPath);
    const baseNoExt = baseName.replace(/\.[^.]+$/, '');
    const isPublic = relPath.startsWith('public/');

    let isUsed = isPublic;
    for (const c of codeContents) {
      if (c.content.includes(baseName) || c.content.includes(baseNoExt)) {
        isUsed = true;
        break;
      }
    }

    const role = classifyRole(relPath);
    const textHeavy = hasImportantText(relPath);

    let origSize = fs.statSync(imgPath).size;
    let backupPath = path.join('originals_backup', relPath);
    if (fs.existsSync(backupPath)) {
      origSize = fs.statSync(backupPath).size;
    }

    let origMeta = { width: 0, height: 0 };
    try {
      origMeta = await sharp(imgPath).metadata();
    } catch(e) {}

    // Target quality 84 for text-heavy, 80 for normal
    const targetQuality = textHeavy ? 84 : 80;
    let newSize = origSize;

    try {
      const inputBuf = fs.readFileSync(imgPath);
      const newBuffer = await sharp(inputBuf)
        .webp({ quality: targetQuality, effort: 6 })
        .toBuffer();

      if (newBuffer.length < origSize) {
        newSize = newBuffer.length;
      }
    } catch(e) {}

    const pctSaved = origSize > 0 ? (((origSize - newSize) / origSize) * 100).toFixed(1) : '0.0';

    rows.push({
      path: relPath,
      role,
      isUsed,
      textHeavy,
      origDim: `${origMeta.width}x${origMeta.height}`,
      origSizeKB: (origSize / 1024).toFixed(1),
      newDim: `${origMeta.width}x${origMeta.height}`,
      newSizeKB: (newSize / 1024).toFixed(1),
      pctSaved: pctSaved > 0 ? `-${pctSaved}%` : '0%',
      targetQuality
    });
  }

  rows.sort((a, b) => parseFloat(b.origSizeKB) - parseFloat(a.origSizeKB));

  let md = '# Image Asset Audit & Optimization Report\n\n';
  md += `**Audit Date**: ${new Date().toISOString()}\n`;
  md += `**Total Assets Evaluated**: ${rows.length}\n\n`;
  md += '| Asset Path | Role | Used? | Text Density | Dimensions | Original Size | Optimized Size | Space Saved | Target WebP Quality |\n';
  md += '|---|---|---|---|---|---|---|---|---|\n';

  let totalOrig = 0;
  let totalNew = 0;

  for (const r of rows) {
    totalOrig += parseFloat(r.origSizeKB);
    totalNew += parseFloat(r.newSizeKB);
    md += `| \`${r.path}\` | ${r.role} | ${r.isUsed ? '✅ Yes' : '❌ Unused'} | ${r.textHeavy ? '⚠️ High (q84)' : 'Standard (q80)'} | ${r.origDim} | ${r.origSizeKB} KB | ${r.newSizeKB} KB | ${r.pctSaved} | ${r.targetQuality} |\n`;
  }

  const netSaved = totalOrig - totalNew;
  const netPct = totalOrig > 0 ? ((netSaved / totalOrig) * 100).toFixed(1) : 0;
  md += `\n### Summary\n- **Total Original Footprint**: ${totalOrig.toFixed(1)} KB (${(totalOrig/1024).toFixed(2)} MB)\n`;
  md += `- **Total Optimized Footprint**: ${totalNew.toFixed(1)} KB (${(totalNew/1024).toFixed(2)} MB)\n`;
  md += `- **Net Space Saved**: ${netSaved.toFixed(1)} KB (${(netSaved/1024).toFixed(2)} MB, -${netPct}%)\n`;

  fs.writeFileSync('C:/Users/adars/.gemini/antigravity/brain/ae3efe0c-a1d8-4e27-9aa4-edb71a4b372c/image_audit_report.md', md);
  console.log(`Audit report written to image_audit_report.md (${rows.length} assets evaluated).`);
  console.log(`Potential space savings: ${netSaved.toFixed(1)} KB (-${netPct}%)`);
}

run().catch(console.error);
