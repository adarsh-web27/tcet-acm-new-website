import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';

const teamDownloads = [
  { file: 'src/assets/images/team/dr-rajesh-bansode.webp', url: 'https://tcet.acm.org/assets/Rajeshsir-3iVUDM6h.jpeg' },
  { file: 'src/assets/images/team/prof-mary-margarat.webp', url: 'https://tcet.acm.org/assets/MaryMAM-CBn4RCNl.jpeg' },
  { file: 'src/assets/images/team/prof-apeksha-waghmare.webp', url: 'https://tcet.acm.org/assets/Apekshamam-Dj6WldQp.jpeg' },
  { file: 'src/assets/images/team/prof-archita-agar.webp', url: 'https://tcet.acm.org/assets/archita-DlKaEGib.png' },
  { file: 'src/assets/images/team/girik-shukla.webp', url: 'https://tcet.acm.org/assets/girik_chairperson-DORQocvf.jpg' },
  { file: 'src/assets/images/team/anannya-salvi.webp', url: 'https://tcet.acm.org/assets/anannya_vicechair-DtSTTp-O.jpg' },
  { file: 'src/assets/images/team/vedant-singh.webp', url: 'https://tcet.acm.org/assets/vedant_secretary-CrbNK9oY.jpg' },
  { file: 'src/assets/images/team/praham-tiwari.webp', url: 'https://tcet.acm.org/assets/praham_eventmanager-D5jSib79.jpg' },
  { file: 'src/assets/images/team/vedant-dusane.webp', url: 'https://tcet.acm.org/assets/vedant_treasurer-DVVpieHl.jpg' },
  { file: 'src/assets/images/team/harshvardhan-miskin.webp', url: 'https://tcet.acm.org/assets/harshvardhan_sponsorship-BkyLEkwv.jpg' },
  { file: 'src/assets/images/team/kaushal-pawar.webp', url: 'https://tcet.acm.org/assets/kaushal_publicity-I71hB_vq.jpg' },
  { file: 'src/assets/images/team/dishi-jain.webp', url: 'https://tcet.acm.org/assets/dishi_publication-B2mgs_mJ.jpg' },
  { file: 'src/assets/images/team/prashant-shukla.webp', url: 'https://tcet.acm.org/assets/prashant_technical-CtXJ7LTW.jpg' },
  { file: 'src/assets/images/team/chirag-prajapati.webp', url: 'https://tcet.acm.org/assets/chirag_creative-Bgh5Ijnu.jpg' },
  { file: 'src/assets/images/team/aaditya-gupta.webp', url: 'https://tcet.acm.org/assets/aaditya_designdirector-CxI2Gzzk.jpg' },
  { file: 'src/assets/images/team/gesu-singh.webp', url: 'https://tcet.acm.org/assets/gesu_webmaster-CI5stpNb.jpg' },
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      const data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
}

async function run() {
  console.log('📥 Downloading and converting live team photos into src/assets/images/team/...\n');
  for (const item of teamDownloads) {
    try {
      console.log(`Fetching ${path.basename(item.file)} from ${item.url}...`);
      const rawBuffer = await fetchBuffer(item.url);
      await sharp(rawBuffer)
        .webp({ quality: 85, effort: 6 })
        .toFile(item.file);
      
      // Also copy to who-we-are
      const whoWeAreFile = item.file.replace('team', 'who-we-are');
      fs.copyFileSync(item.file, whoWeAreFile);
      
      const sizeKb = (fs.statSync(item.file).size / 1024).toFixed(1);
      console.log(`✓ Saved ${item.file} (${sizeKb} KB)`);
    } catch (err) {
      console.error(`✗ Error on ${item.file}:`, err.message);
    }
  }
  console.log('\n✨ Finished downloading and converting all team images into src/assets/images/team/ and who-we-are/!\n');
}

run();
