import { NFTStorage, File } from 'nft.storage'
import fs from 'fs'
// var fs = require('fs');
const client = new NFTStorage({ token: '' })

var directory = 'C:\\Users\\Spencer\\Documents'

var fileList = []

async function findFiles() {
    console.log('finding files')
    var files = fs.readdirSync(directory);
    
    for(const temp of files) {
        var fileName = directory + '\\' + temp
        fileList.push(new File([fs.readFileSync(fileName)], temp))
    }
    for (const t of fileList) {
      console.log(t.name)
    }
    return await client.storeDirectory(fileList);
}

async function check() {
  console.log("running check")
  for (const t of fileList) {
    console.log(t.name)
  }
  console.log(fileList.length)
}

console.log(findFiles())
// check()