// const contractService = require('./contract-service')
// const ipfsService = require('./ipfs-service')
// const o2oService = require('./o2o-service')

import ContractService from './contract-service'
import IpfsService from './ipfs-service'
import O2OService from './o2o-service'
import UserRegistryService from './user-registry-service'

const contractService = new ContractService()
const ipfsService = new IpfsService()
const o2oService = new O2OService({ contractService, ipfsService })
const userRegistryService = new UserRegistryService()

var o2oprotocol = {
    contractService: contractService,
    ipfsService: ipfsService,
    o2oService: o2oService,
    userRegistryService: userRegistryService
}

var resources = {
    listings: require('./resources/listings')
}

// Give each resource access to the o2oprotocol services.
// By having a single o2oprotocol, its configuration can be changed
// and all contracts will follow it
for(var resourceName in resources){
    resources[resourceName].o2oprotocol = o2oprotocol
    o2oprotocol[resourceName] = resources[resourceName]
}

module.exports = o2oprotocol