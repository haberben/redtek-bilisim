const fs = require('fs');
const https = require('https');

const dataPath = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const uniqueUrls = new Set();
data.forEach(p => {
  if (p.images) {
    p.images.forEach(img => uniqueUrls.add(img));
  }
});

const checkUrl = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
};

const defaultImage = "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=800"; // known working iphone image
const defaultMac = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"; // known working mac image

async function run() {
  const urlStatus = {};
  for (const url of uniqueUrls) {
    urlStatus[url] = await checkUrl(url);
    console.log(`URL: ${url} - Valid: ${urlStatus[url]}`);
  }

  let fixedCount = 0;
  const updatedData = data.map(p => {
    const newImages = (p.images || []).map(img => {
      if (!urlStatus[img]) {
        fixedCount++;
        return p.title.toLowerCase().includes('mac') || p.title.toLowerCase().includes('ipad') ? defaultMac : defaultImage;
      }
      return img;
    });
    return { ...p, images: newImages };
  });

  fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2));
  console.log(`Fixed ${fixedCount} broken images.`);
}

run();
