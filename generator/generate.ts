import jimp from 'jimp';
import Color from 'color';

const width = 100;
const height = 100;
const cutoffColor = jimp.rgbaToInt(250, 250, 250, 255);
const total = 45

const eyeTraitCount = 9
const earTraitCount = 9
const noseTraitCount = 9;
const mouthTraitCount = 9;
const hatTraitCount = 9;




const stack = (color1: number, color2: number) => {
    if (color1 > cutoffColor) return color2
    else
        if (color2 > cutoffColor) return color1;
        else {
            return parseInt(Color(color1).mix(Color(color2)).hex(), 16);
        }
}

const generateSingle = async (ear: number, eye: number, nose: number, mouth: number, hat: number) => {
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
    await image.write(`../_output/images/output_${ear}_${eye}_${nose}_${mouth}_${hat}.png`);
}



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
            // await generateSingle(ear, eye, nose, mouth, hat);
            genomes.push(genome);
        }
        else {
            i--;
        }
    }
    // print genomes
    console.log(genomes);
}

generateAll();