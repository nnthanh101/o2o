const { O2OProtocol } = require("../../services")
const Web3 = require("web3")
const HDWalletProvider = require("truffle-hdwallet-provider")

const resetListings = () => {
  const mnemonic = process.env.MNEMONIC || "logic cradle area quality lumber pitch radar sense dove fault capital observe"
  const provider = new HDWalletProvider(mnemonic, "http://localhost:8545")
  const web3 = new Web3(provider)

  const { IPFS_ADDRES_API, IPFS_ADDRES_GATEWAY } = process.env
  const ipfsApiPort = IPFS_ADDRES_API || 5001
  const ipfsGatewayPort = IPFS_ADDRES_GATEWAY || 8080

  const ipfsConfig = {
    ipfsApiPort,
    ipfsGatewayPort,
    ipfsDomain: "localhost",
    ipfsProtocol: "http"
  }

  // o2oprotocol services
  const o2o = new O2OProtocol({ web3, ipfsConfig })
  const { contractService } = o2o

  contractService
    .reset()
    .then(isSuccess => {
      console.log(`[INFO] Success: ${isSuccess}`)
    })
    .catch(err => console.log(err))
}

resetListings()
