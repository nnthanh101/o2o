const products = require("./product-data/products.json")
const categories = require("./product-data/categories.json")
const { convertToListingProducts } = require("./convert")
const { O2OProtocol } = require("../../services")
const Web3 = require("web3")
const HDWalletProvider = require("truffle-hdwallet-provider")

const createDefaultListings = () => {
  const mnemonic = process.env.MNEMONIC || "logic cradle area quality lumber pitch radar sense dove fault capital observe"
  const provider = new HDWalletProvider(mnemonic, "http://localhost:8545")
  const web3 = new Web3(provider)

  const { IPFS_ADDRES_API, IPFS_ADDRES_GATEWAY } = process.env
  const ipfsApiPort = IPFS_ADDRES_API || 5001
  const ipfsGatewayPort = IPFS_ADDRES_GATEWAY || 8081

  const ipfsConfig = {
    ipfsApiPort,
    ipfsGatewayPort,
    ipfsDomain: "localhost",
    ipfsProtocol: "http"
  }

  // o2oprotocol services
  const o2o = new O2OProtocol({ web3, ipfsConfig })
  const { contractService, ipfsService, listings } = o2o

  // Deploy default listing by account 0
  const listingProducts = convertToListingProducts({ categories, products })
  const wait = Promise.all(
    listingProducts.map(async listingData => {
      const ipfsData = { data: listingData, schema: "http://localhost:3000/schemas/mobile-tablet.json" }
      const ipfsHash = await ipfsService.submitFile(ipfsData)
      const total = await contractService.submitListing(ipfsHash, listingData.price, listingData.unitsAvailable)
      return ipfsHash
    })
  )

  wait.then(hashList => {
    console.log("[INFO] DEMO PRODUCTS IPFS HASH")
    console.log(hashList)
    console.log("Init data finished.")
  })

  // listings.reset()
}

createDefaultListings()

// module.exports = {
//   createDefaultListings
// }
