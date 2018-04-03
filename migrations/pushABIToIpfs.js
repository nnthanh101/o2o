const fs = require("fs")
const {pushFilesToIpfs} = require("../ipfs/api/pushFilesOnIpfs")

const projectPath = `${__dirname}/..`
const CONTRACT_ABI_DIR = "build/contracts"
const abiPath = `${projectPath}/${CONTRACT_ABI_DIR}`;

// Ipfs client conifg
// const host = process.env.IPFS_HOST || "ipfs.infura.io"
// const port = process.env.IPFS_PORT || 5001
const host = process.env.IPFS_HOST || "localhost"
const port = process.env.IPFS_PORT || 5001
const ipfsConfig = {host, port, protocol: "http"}

// ABI files
const abiFilenames = fs.readdirSync(abiPath)
const files = abiFilenames.map(fileName => `${abiPath}/${fileName}`)

const pushABIToIpfs = () => {
  return pushFilesToIpfs(ipfsConfig, files)
}

module.exports = {
  pushABIToIpfs,
}
