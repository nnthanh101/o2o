const IPFS = require('ipfs-daemon')
const options = {
	IpfsDataDir: "/root/ipfs-data",
  LogDirectory: '/tmp', // Directory to write ipfs-daemon.log file for ipfs-daemon
  Flags: ['--enable-pubsub-experiment'], // Flags to pass to IPFS daemon
  Addresses: { // IPFS Daemon addresses
    API: process.env.IPFS_ADDRES_API || '/ip4/0.0.0.0/tcp/5001',
    Swarm: [process.env.IPFS_ADDRES_SWARM || '/ip4/0.0.0.0/tcp/4001'],
    Gateway: process.env.IPFS_ADDRES_GATEWAY || '/ip4/0.0.0.0/tcp/8082',
  },
  API: { // API config for IPFS daemon
    HTTPHeaders: {
      "Access-Control-Allow-Origin": ['*'], // Origins from which to allow http requests
      "Access-Control-Allow-Methods": ["PUT", "GET", "POST", "DELETE"], // "PUT", "GET", "POST", "DELETE", etc.
      "Access-Control-Allow-Credentials": true, // "true" || "false"
    } 
  },
  SignalServer: null // WebRTC sig-star server, browser only, eg. '127.0.0.1'
}
const ipfs = new IPFS(options)
const _ = console.log

ipfs.on('ready', () => _("[INFO] IPFS ready"))
ipfs.on('error', e => _("[INFO] IPFS err", e.message, e.stack))