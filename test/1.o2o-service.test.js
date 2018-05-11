import { expect } from "chai"
import ContractService from "../src/contract-service"
import IpfsService from "../src/ipfs-service"
import O2OService from "../src/o2o-service"
import { web3 } from "./fixtures"

const methodNames = ["submitListing"]

describe("1.O2OService", () => {
  let contractService
  let ipfsService
  let o2oService

  beforeEach(() => {
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