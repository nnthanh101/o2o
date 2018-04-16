import ContractService from "./contract-service"
import IpfsService from "./ipfs-service"
import UserRegistryService from "./user-registry-service"
import Listings from "./resources/listings"

// Resources contain mutiple definition of Smart Contract workflows
// TODO Should load anything inside resources programatically
const resources = {
  listings: Listings
}

class O2OProtocol {
  constructor(options) {
    // Fail soon when no web3 supply
    const { web3, ipfsConfig } = options || {}
    if (!web3) throw new Error("Please provide 'web3' in options")
    if (!ipfsConfig) throw new Error("Please provide 'ipfsConfig' in options")

    // Should load web3 explicitly
    // Load from window.web3 is not good option
    this.contractService = new ContractService({ web3 })
    this.ipfsService = new IpfsService(ipfsConfig)

    // TODO: This service is deprecated
    this.userRegistryService = new UserRegistryService({ web3 })

    // Instantiate each resource and give it access to contracts and IPFS
    for (let resourceName in resources) {
      let Resource = resources[resourceName]
      this[resourceName] = new Resource({
        contractService: this.contractService,
        ipfsService: this.ipfsService
      })
    }
  }
}

export { O2OProtocol }
