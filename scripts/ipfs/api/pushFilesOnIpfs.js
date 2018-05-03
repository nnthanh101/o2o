const IPFS = require('ipfs-api')
const _ = console.log

/**
 * Push files to IPFS
 * @param ipfsConifg
 * {host: string, port: number, protocol: string}
 * @param files
 * @return {Promise}
 */
const pushFilesToIpfs = (ipfsConifg, files) => {
  const ipfs = new IPFS(ipfsConifg)
  return new Promise((resolve, reject) => {
    ipfs.add(files, (err, res) => {
      if(err || !res) {
        _("[ipfs.add][ERR]", err.message, err.stack)
        return reject()
      }

      return resolve(res)
    })
  })
}

module.exports = {
  pushFilesToIpfs,
}