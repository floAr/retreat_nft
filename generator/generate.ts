import jimp from 'jimp';
import Color from 'color';
import fs from 'fs';
import path from 'path';
import { NFTStorage, File } from 'nft.storage';

const width = 100;
const height = 100;
const cutoffColor = jimp.rgbaToInt(250, 250, 250, 255);
const total = 45;

const eyeTraitCount = 9;
const earTraitCount = 9;
const noseTraitCount = 9;
const mouthTraitCount = 9;
const hatTraitCount = 9;

const stack = (color1: number, color2: number) => {
  if (color1 > cutoffColor) return color2;
  else if (color2 > cutoffColor) return color1;
  else {
    return parseInt(Color(color1).mix(Color(color2)).hex(), 16);
  }
};

const generateSingle = async (
  ear: number,
  eye: number,
  nose: number,
  mouth: number,
  hat: number
) => {
  const earImage = await jimp.read(`../data/ear/${ear}.png`);
  const eyeImage = await jimp.read(`../data/eye/${eye}.png`);
  const noseImage = await jimp.read(`../data/nose/${nose}.png`);
  const mouthImage = await jimp.read(`../data/mouth/${mouth}.png`);
  const hatImage = await jimp.read(`../data/hat/${hat}.png`);

  const image = new jimp(width, height, 0xffffff);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const earColor = earImage.getPixelColor(x, y);
      const eyeColor = eyeImage.getPixelColor(x, y);
      const noseColor = noseImage.getPixelColor(x, y);
      const mouthColor = mouthImage.getPixelColor(x, y);
      const hatColor = hatImage.getPixelColor(x, y);

      let finalColor = stack(earColor, eyeColor);
      finalColor = stack(finalColor, noseColor);
      finalColor = stack(finalColor, mouthColor);
      finalColor = stack(finalColor, hatColor);
      image.setPixelColor(finalColor, x, y);
    }
  }
  // save image
  await image.write(
    `../_output/images/output_${ear}_${eye}_${nose}_${mouth}_${hat}.png`
  );
};

const generateAll = async () => {
  const genomes = [];

  let earArray = Array.from(Array(earTraitCount).keys());
  let eyeArray = Array.from(Array(eyeTraitCount).keys());
  let noseArray = Array.from(Array(noseTraitCount).keys());
  let mouthArray = Array.from(Array(mouthTraitCount).keys());
  let hatArray = Array.from(Array(hatTraitCount).keys());

  for (let i = 0; i < 45; i++) {
    if (earArray.length === 0) {
      earArray = Array.from(Array(earTraitCount).keys());
      eyeArray = Array.from(Array(eyeTraitCount).keys());
      noseArray = Array.from(Array(noseTraitCount).keys());
      mouthArray = Array.from(Array(mouthTraitCount).keys());
      hatArray = Array.from(Array(hatTraitCount).keys());
    }

    const ear = earArray[Math.floor(Math.random() * earArray.length)];
    earArray.splice(earArray.indexOf(ear), 1);
    const eye = eyeArray[Math.floor(Math.random() * eyeArray.length)];
    eyeArray.splice(eyeArray.indexOf(eye), 1);
    const nose = noseArray[Math.floor(Math.random() * noseArray.length)];
    noseArray.splice(noseArray.indexOf(nose), 1);
    const mouth = mouthArray[Math.floor(Math.random() * mouthArray.length)];
    mouthArray.splice(mouthArray.indexOf(mouth), 1);
    const hat = hatArray[Math.floor(Math.random() * hatArray.length)];
    hatArray.splice(hatArray.indexOf(hat), 1);
    // build genome
    const genome = [ear, eye, nose, mouth, hat].join('_');
    // check if gemome already exists
    if (genomes.indexOf(genome) === -1) {
      await generateSingle(ear, eye, nose, mouth, hat);
      genomes.push(genome);
    } else {
      i--;
    }
  }

  console.log('Generated Genomes: ', genomes);

  fs.writeFileSync('../_output/genomes.json', JSON.stringify(genomes, null, 2));
};

async function uploadImages() {
  const client = new NFTStorage({ token: '' });
  const files = fs.readdirSync('../_output/images');
  const fileList = [];
  for (const temp of files) {
    var fileName = path.join('../_output/images', temp);
    fileList.push(new File([fs.readFileSync(fileName)], temp));
  }

  const imageStorageHash = await client.storeDirectory(fileList);
  console.log('Images Stored at:', imageStorageHash);
  fs.writeFileSync('../_output/imageStorageHash.txt', imageStorageHash);
}

async function generateMetadata() {
  const genomes = JSON.parse(
    fs.readFileSync('../_output/genomes.json').toString()
  );

  const uploadHash = fs
    .readFileSync('../_output/imageStorageHash.txt')
    .toString();

  for (let i = 0; i < 45; i++) {
    const genome = genomes[i];

    const ear = genome[0];
    const mouth = genome[1];
    const nose = genome[2];
    const eyes = genome[3];
    const hat = genome[4];

    const metaDict = {
      name: '#' + i.toString(),
      description: 'Made by the greatest',
      image: `ipfs://${uploadHash}/${i}.png`,
      external_url: 'https://www.niftyisland.com/',
      standard: { name: 'ERC-NIFTY', version: '0.0.1' },
      extensions: ['NIMDE_ATTRIBUTES_v1'],
      attributes: [
        {
          trait_type: 'Ear',
          value: ear,
        },
        {
          trait_type: 'Mouth',
          value: mouth,
        },
        {
          trait_type: 'Eyes',
          value: eyes,
        },
        {
          trait_type: 'Nose',
          value: nose,
        },
        {
          trait_type: 'Hat',
          value: hat,
        },
      ],
    };

    const dictString = JSON.stringify(metaDict, null, 2);
    fs.writeFileSync(`../_output/metadata/${i}.json`, dictString);
  }
}

async function uploadMetadata() {
  const client = new NFTStorage({ token: '' });
  const files = fs.readdirSync('../_output/metadata');
  const fileList = [];
  for (const temp of files) {
    var fileName = path.join('../_output/metadata', temp);
    fileList.push(new File([fs.readFileSync(fileName)], temp));
  }

  const metadataStorageHash = await client.storeDirectory(fileList);
  console.log('Metadata Stored at:', metadataStorageHash);
  fs.writeFileSync('../_output/metadataStorageHash.txt', metadataStorageHash);
}

async function main() {
  await generateAll();
  //   await uploadImages();
  //   await generateMetadata();
  //   await uploadMetadata();
}
