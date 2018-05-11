var ipfsAPI = require('ipfs-api')
var HttpIPFS = require('ipfs/src/http')
const populateIpfs = require("./populateIpfs")
const { getIpfsConfig } = require("../utils")
const fixtureType = process.env.FIXTURE_TYPE || "ecommerce"
const dotenv = require("dotenv");

// Load .env
dotenv.config();

const startIpfs = (opts = {}) => {
  const cnf = getIpfsConfig()

  return new Promise((resolve, reject) => {
    const httpAPI = new HttpIPFS(undefined, {
      Addresses: {
        API: `/ip4/0.0.0.0/tcp/${cnf.IPFS_API_PORT}`,
        Gateway: `/ip4/0.0.0.0/tcp/${cnf.IPFS_GATEWAY_PORT}`
      }
    })
    console.log('Start IPFS')
    httpAPI.start(true, async err => {
      if (err) {
        return reject(err)
      }
      console.log('Started IPFS')
      const ipfs = ipfsAPI('localhost', cnf.IPFS_API_PORT, { protocol: 'http' })
      await populateIpfs(ipfs, fixtureType)
      resolve()
    })
  })
}
  

// const populateIpfs = () =>
//   new Promise((resolve, reject) => {
//     var ipfs = ipfsAPI('localhost', '5002', { protocol: 'http' })
//     console.log('Populate IPFS...')
//     ipfs.util.addFromFs(fixturesDir, { recursive: true }, (err, result) => {
//       if (err) {
//         return reject(err)
//       }
//       resolve(result)
//     })
//   })

module.exports = startIpfs
