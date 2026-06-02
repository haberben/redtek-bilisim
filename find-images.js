const https = require('https');

const checkUrl = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
};

async function testCategory(category, max=120) {
  console.log(`Testing ${category}...`);
  for (let i = 1; i <= max; i++) {
    const url = `https://pngimg.com/uploads/${category}/${category}_PNG${i}.png`;
    const ok = await checkUrl(url);
    if (ok) {
      console.log(`Found: ${url}`);
      return url;
    }
  }
  console.log(`Not found for ${category}`);
}

async function run() {
  await testCategory('ipad');
  await testCategory('airpods');
  await testCategory('apple_charger');
}

run();
