const HttpProvider = require('ethjs-provider-http')
const BlockTracker = require('eth-block-tracker')

const provider = new HttpProvider('https://mainnet.infura.io')
const blockTracker = new BlockTracker({ provider })
blockTracker.on('block', console.log)
blockTracker.start()