const IPFS = require('ipfs-daemon')
const ipfs = new IPFS()
const _ = console.log

ipfs.on('ready', () => _("[INFO] IPFS ready"))
ipfs.on('error', e => _("[INFO] IPFS err", e.message, e.stack))