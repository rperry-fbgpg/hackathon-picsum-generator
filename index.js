const axios = require('axios');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetchImage = async (width, height, imageName) => {
  try {
    const url = `https://picsum.photos/${width}/${height}`;
    const response = await axios({
      url,
      responseType: 'stream',
    });

    const imagePath = path.resolve(__dirname, 'images', `${imageName}.jpg`);
    response.data.pipe(fs.createWriteStream(imagePath));

    console.log(`Image saved as ${imagePath}`);
  } catch (error) {
    console.error('Error fetching the image:', error);
  }
};

const main = () => {
  if (!fs.existsSync(path.resolve(__dirname, 'images'))) {
    fs.mkdirSync(path.resolve(__dirname, 'images'));
  }

  rl.question('Enter the width of the image: ', (width) => {
    rl.question('Enter the height of the image: ', (height) => {
      const uniqueString = `${width}x${height}-${Date.now()}`;
      const imageName = `sample-image-${uniqueString}`;
      fetchImage(width, height, imageName);
      rl.close();
    });
  });
};

main();