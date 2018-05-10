var ipfsAPI = require('ipfs-api')
var HttpIPFS = require('ipfs/src/http')
const populateIpfs = require("./populateIpfs")
const fixtureType = process.env.FIXTURE_TYPE || "ecommerce"

const startIpfs = (opts = {}) =>
  new Promise((resolve, reject) => {
    const httpAPI = new HttpIPFS(undefined, {
      Addresses: {
        API: '/ip4/0.0.0.0/tcp/5002',
        Gateway: '/ip4/0.0.0.0/tcp/8080'
      }
    })
    console.log('Start IPFS')
    httpAPI.start(true, async err => {
      if (err) {
        return reject(err)
      }
      console.log('Started IPFS')
      //@TODO Populate demo listings from s3
      const ipfs = ipfsAPI('localhost', '5002', { protocol: 'http' })
      await populateIpfs(ipfs, fixtureType)

      resolve()
    })
  })

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
