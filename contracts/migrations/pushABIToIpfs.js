const fs = require("fs");
const IPFS = require('ipfs-api');
const path = require("path");
const dotenv = require("dotenv")
const _ = console.log

dotenv.config()

/**
 * Push files to IPFS
 * @param ipfsConifg
 * @param files
 * @return {Promise}
 */
const pushFilesToIpfs = (ipfsConifg, files, options = {}) => {
  const ipfs = new IPFS(ipfsConifg)
  
  return new Promise((resolve, reject) => {
    ipfs.add(files, options, (err, res) => {
      if(err || !res) {
        _("[ipfs.add][ERR]", err.message, err.stack)
        return reject()
      }

      return resolve(res)
    })
  })
}

const pushABIToIpfs = () => {
  // Ipfs client conifg
  // const host = process.env.IPFS_HOST || "ipfs.infura.io"
  // const port = process.env.IPFS_PORT || 5001
  // const protocol = process.env.IPFS_PROTOCOL || "https"
  // const ipfsConfig = {host, port, protocol}

  // const abiPath = path.join(__dirname, "..", "build", "contracts");
  // const abiFilenames = fs.readdirSync(abiPath)
  // const files = abiFilenames.map(fileName => path.join(abiPath, fileName))

  // return pushFilesToIpfs(ipfsConfig, files)

  const host = "localhost"
  const port = process.env.IPFS_API_PORT
  const protocol = "http"
  const ipfsConfig = {host, port, protocol}

  const abiPath = path.join(__dirname, "..", "build", "contracts");
  return pushFilesToIpfs(ipfsConfig, [abiPath], { recursive: true, wrapWithDirectory: true })
}

module.exports =  pushABIToIpfs