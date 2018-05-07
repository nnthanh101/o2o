var HDWalletProvider = require("truffle-hdwallet-provider");

// Local setup
truffleSetup = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,  // `truffle develop` will override and use port 9545
      network_id: "*" // Match any network id
    },
  },
  solc: { optimizer: { enabled: true, runs: 200 } }
}

// For global test networks and mainnet, set your wallet mnemonic in env
// variable. Assumes we're using first address for that mnemonic.
// In future we might consider prompting for mnemonics:
// https://www.npmjs.com/package/prompt
//

// Please setup gas limit to resolve bug "exceed gas limit" when deploy
// TODO: gasLimit = Gtransaction + Gtxdatanonzero × dataByteLength
// gasLimit = 21000 + 68 * Gtxdatanonzero:10 = 21000 + 680 = 21680
const gas = process.env.GAS_LIMIT || 4712388 // milion

if (process.env.MAINNET_MNEMONIC) {
  truffleSetup.networks.mainnet = {
    provider: function() {
      return new HDWalletProvider(
        process.env.MAINNET_MNEMONIC,
        `https://mainnet.infura.io/${process.env.INFURA_ACCESS_TOKEN}`)
    },
    network_id: 1,
    gas,
  }
}
if (process.env.RINKEBY_MNEMONIC) {
  truffleSetup.networks.rinkeby = {
    provider: function() {
      return new HDWalletProvider(
        process.env.RINKEBY_MNEMONIC,
        `https://rinkeby.infura.io/${process.env.INFURA_ACCESS_TOKEN}`)
    },
    network_id: 4,
    gas,
  }
}
if (process.env.ROPSTEN_MNEMONIC) {
  truffleSetup.networks.ropsten = {
    provider: function() {
      return new HDWalletProvider(
        process.env.ROPSTEN_MNEMONIC,
        `https://ropsten.infura.io/${process.env.INFURA_ACCESS_TOKEN}`)
    },
    network_id: 3,
    gas,
  }
}

module.exports = truffleSetup