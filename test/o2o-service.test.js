import { expect } from "chai"
import ContractService from "../src/contract-service"
import IpfsService from "../src/ipfs-service"
import O2OService from "../src/o2o-service"
import Web3 from "web3"

const methodNames = ["submitListing"]

describe("O2OService", () => {
  let contractService
  let ipfsService
  let o2oService

  beforeEach(() => {
    let provider = new Web3.providers.HttpProvider("http://localhost:8545")
    let web3 = new Web3(provider)
    contractService = new ContractService({ web3 })
    ipfsService = new IpfsService()
    o2oService = new O2OService({ contractService, ipfsService })
  })

  methodNames.forEach(methodName => {
    it(`should have ${methodName} method`, () => {
      expect(o2oService[methodName]).to.be.an.instanceof(Function)
    })
  })
})