import ContractService from "./contract-service"
import IpfsService from "./ipfs-service"
import { Attestations } from "./resources/attestations"
import Users from "./resources/users"
import fetch from "cross-fetch"

var resources = {
  listings: require("./resources/listings"),
  purchases: require("./resources/purchases"),
  users: require("./resources/users")
}

const defaultBridgeServer = "https://bridge.o2oprotocol.com"
const defaultIpfsDomain = "gateway.o2oprotocol.com"
const defaultIpfsApiPort = "5002"
const defaultIpfsGatewayPort = "443"
const defaultIpfsGatewayProtocol = "https"
const defaultAttestationServerUrl = `${defaultBridgeServer}/api/attestations`

class O2OProtocol {
  constructor({
    ipfsDomain = defaultIpfsDomain,
    ipfsApiPort = defaultIpfsApiPort,
    ipfsGatewayPort = defaultIpfsGatewayPort,
    ipfsGatewayProtocol = defaultIpfsGatewayProtocol,
    attestationServerUrl = defaultAttestationServerUrl,
    contractAddresses,
    web3
  } = {}) {
    this.contractService = new ContractService({ contractAddresses, web3 })
    this.ipfsService = new IpfsService({
      ipfsDomain,
      ipfsApiPort,
      ipfsGatewayPort,
      ipfsGatewayProtocol
    })
    this.attestations = new Attestations({
      serverUrl: attestationServerUrl,
      contractService: this.contractService,
      fetch
    })

    // Instantiate each resource and give it access to contracts and IPFS
    for (let resourceName in resources) {
      let Resource = resources[resourceName]
      // A `Resource` constructor always takes a contractService and ipfsService
      this[resourceName] = new Resource({
        contractService: this.contractService,
        ipfsService: this.ipfsService
      })
    }
  }
}

module.exports = O2OProtocol
