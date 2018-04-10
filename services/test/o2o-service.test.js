import Web3 from "web3"
import { expect } from "chai"
import O2OService from "../src/o2o-service"
import IpfsService from "../src/ipfs-service"
import ContractService from "../src/contract-service"

const methodNames = ["submitListing"]

describe("O2OService", () => {
  let contractService
  let ipfsService
  let originService

  beforeEach(() => {
    const provider = new Web3.providers.HttpProvider("http://localhost:8545")
    const web3 = new Web3(provider)

    contractService = new ContractService({ web3 })
    ipfsService = new IpfsService({ web3 })
    originService = new O2OService({ contractService, ipfsService })
  })

  methodNames.forEach(methodName => {
    it(`should have ${methodName} method`, () => {
      expect(originService[methodName]).to.be.an.instanceof(Function)
    })
  })
})
