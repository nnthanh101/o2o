// const contractService = require('./contract-service')
// const ipfsService = require('./ipfs-service')
// const o2oService = require('./o2o-service')

import ContractService from "./contract-service"
import IpfsService from "./ipfs-service"
import O2OService from "./o2o-service"
// import UserRegistryService from "./user-registry-service"

const contractService = new ContractService()
const ipfsService = new IpfsService()
const o2oService = new O2OService({ contractService, ipfsService })
// const userRegistryService = new UserRegistryService()

export default {
  allIds: async function() {
    return await contractService.getAllListingIds()
  },

  getByIndex: async function(listingIndex) {
    const contractData = await contractService.getListing(listingIndex)
    const ipfsData = await ipfsService.getFile(contractData.ipfsHash)
    // ipfsService should have already checked the contents match the hash,
    // and that the signature validates

    // We explicitly set these fields to white list the allowed fields.
    const listing = {
      name: ipfsData.data.name,
      category: ipfsData.data.category,
      description: ipfsData.data.description,
      location: ipfsData.data.location,
      pictures: ipfsData.data.pictures,

      address: contractData.address,
      index: contractData.index,
      ipfsHash: contractData.ipfsHash,
      sellerAddress: contractData.lister,
      price: contractData.price,
      unitsAvailable: contractData.unitsAvailable
    }

    // TODO: Validation
    return listing
  },

  create: async function(data, schemaType) {
    if (typeof data.price === "undefined") {
      throw "You must include a price"
    }
    if (typeof data.name === "undefined") {
      throw "You must include a name"
    }
    return o2oService.submitListing({ formData: data }, schemaType)
  },

  buy: async function(listingAddress, unitsToBuy, ethToPay) {
    return await contractService.buyListing(listingAddress, unitsToBuy, ethToPay)
  }
}
