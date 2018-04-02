const ipfsAPI = require('ipfs-api')
const fs = require("fs")

// connect to ipfs daemon API server
const ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})
const FILES_DIR = "files"

/**
 * Simple push to ipfs
 * > Can i run it without IPFS DAEMON?
 */
const pushToIpfs = () => {
  const fileDirPath = `${__dirname}/${FILES_DIR}`
  const fileNames = fs.readdirSync(fileDirPath)
  const files = fileNames.map(fileName => `${fileDirPath}/${fileName}`)

  ipfs.add(files, function(err, res) {
    if(err || !res) return console.error(err)

    res.forEach(function(file) {
      console.log(file)
    })
  })
}

pushToIpfs()