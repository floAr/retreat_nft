const fs = require('fs')

const pathToFiles = 'E:\\LooksData\\images'
const newPathToFiles = 'E:\\LooksData\\'
const files = fs.readdirSync(pathToFiles)

let count = 1

for (const file of files) {
    if (file.endsWith('.png')) {
        var splitarray = file.split("_")
        
        var ear = splitarray[0]
        var mouth = splitarray[1]
        var nose = splitarray[2]
        var eyes = splitarray[3]
        var hat = splitarray[4]
        
        var metaDict = {
            "name": "#" + string(count),
            "description": "Super sweet NFTs",
            "image": "https://nifty-island-pistol-drop-public.s3.us-east-2.amazonaws.com/pistol_1/pistol_1_mp4/pistol_1.mp4",
            "external_url": "https://www.niftyisland.com/",
            "standard": { "name": "ERC-NIFTY", "version": "0.0.1" },
            "extensions": [
                {
                    "name": "previews",
                    "version": "0.0.1",
                },
                {
                    "name": "attributes",
                    "version": "1.0.0"
                 }
            ],
            "attributes": [
                {
                    "trait_type": "Ear", 
                    "value": ear
                },
                {
                    "trait_type": "Mouth", 
                    "value": mouth
                },
                {
                    "trait_type": "Eyes", 
                    "value": eyes
                },
                {
                    "trait_type": "Nose", 
                    "value": nose
                },
                {
                    "trait_type": "Hat", 
                    "value": hat
                }
            ],
            "previews": [
                {
                    "url": "https://ipfs.io/43",
                    "name": "ModelOfAWholeHouse",
                    "description": "abcd",
                    "fileType": "image",  // THIS IS A MIME-LIKE TYPEx
                }
            ],
        }

        var dictString = JSON.stringify(metaDict)
        // solidity doesn't prepend with 0's, so name it just the number.json
        fs.writeFile(newPathToFiles + "\\metadata\\" + intNum + ".json", dictString, function(err, result) {
            if(err) console.log('error', err);
        })
        count++;
    }
}