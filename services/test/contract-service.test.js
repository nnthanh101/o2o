import { expect } from 'chai'
import ContractService from '../src/contract-service'
import { ipfsHashes } from './fixtures'

const methodNames = [
  'submitListing',
  'getBytes32FromIpfsHash',
  'getIpfsHashFromBytes32'
]

describe('ContractService', () => {
  let contractService

  beforeEach(() => {
    contractService = new ContractService()
  })

  methodNames.forEach((methodName) => {
    it(`should have ${methodName} method`, () => {
      expect(contractService[methodName]).to.be.an.instanceof(Function)
    })
  })

  describe('blockchain running', () => {
    it(`should should have injected web3 object`, () => {
      expect('web3' in window).to.equal(true)
    })
    it(`should be connected to local blockchain`, () => {
      // Will return "connecting" if still waiting for connection,
      // otherwise network number (e.g. 1 for mainnet)
      const result = (isNaN(web3.version.network))
      expect(result).to.equal(false)
    })
  })

  describe('getBytes32FromIpfsHash', () => {
    ipfsHashes.forEach(({ ipfsHash, bytes32 }) => {
      it(`should correctly convert from IPFS hash ${ipfsHash}`, () => {
        const result = contractService.getBytes32FromIpfsHash(ipfsHash)
        expect(result).to.equal(bytes32)
      })
    })
  })

  describe('getIpfsHashFromBytes32', () => {
    ipfsHashes.forEach(({ ipfsHash, bytes32 }) => {
      it(`should correctly convert to IPFS hash ${ipfsHash}`, () => {
        const result = contractService.getIpfsHashFromBytes32(bytes32)
        expect(result).to.equal(ipfsHash)
      })
    })
  })

  describe('submitListing', () => {
    // Skipped by default because it pops up MetaMask confirmation dialogue every time you make a
    // change which slows down dev. Should add alternate tests that mock MetaMask and only enable
    // this one as part of manual testing before releases to ensure library works with MetaMask.
    xit('should successfully submit listing', async () => {
      await contractService.submitListing('Qmbjig3cZbUUufWqCEFzyCppqdnmQj3RoDjJWomnqYGy1f', '0.00001', 1)
    })
  })

  describe('getAllListingIds', () => {
    it('should get an array of numbers', async () => {
      const result = await contractService.getAllListingIds()
      expect(result).to.be.an('array')
      result.forEach(id => expect(id).to.be.a('number'))
    })
  })

  describe('getListing', () => {
    // Skipped because of https://github.com/o2oprotocol/o2oprotocol/issues/27
    xit('should reject when listing cannot be found', (done) => {
      contractService.getListing('foo').then(done.fail, (error) => {
        expect(error).to.match(/Error fetching listingId/)
        done()
      })
    })

    it('should get a listing object', async () => {
      const ids = await contractService.getAllListingIds()
      expect(ids.length).to.be.greaterThan(0)
      const listing = await contractService.getListing(ids[0])
      expect(listing).to.have.keys('address', 'index', 'lister', 'ipfsHash', 'price', 'unitsAvailable')
    })
  })

})
