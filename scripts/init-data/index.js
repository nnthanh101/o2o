const products = require("./product-data/products.json")
const categories = require("./product-data/categories.json")
const { convertToListingProducts } = require("./convert")
const { O2OProtocol } = require("../../services")
const Web3 = require("web3")

const createDefaultListings = () => {
  const listingProducts = convertToListingProducts({ categories, products })
  // console.log(listingProducts[0])

  const provider = new Web3.providers.HttpProvider("http://localhost:8545")
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

  const o2o = new O2OProtocol({ web3, ipfsConfig })
  const listings = o2o.listings
  console.log(listings)

  // listings.reset()
}

// createDefaultListings()

module.exports = {
  createDefaultListings
}
