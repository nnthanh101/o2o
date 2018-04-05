import { expect } from 'chai';
import ContractService from '../src/contract-service'
import IpfsService from '../src/ipfs-service'
import O2OService from '../src/o2o-service'

const methodNames = [
  'submitListing'
]

describe('O2OService', () => {

  let contractService
  let ipfsService
  let o2oService

  beforeEach(() => {
    contractService = new ContractService()
    ipfsService = new IpfsService()
    o2oService = new O2OService({ contractService, ipfsService })
  })

  methodNames.forEach((methodName) => {
    it(`should have ${methodName} method`, () => {
      expect(o2oService[methodName]).to.be.an.instanceof(Function)
    })
  })

})
