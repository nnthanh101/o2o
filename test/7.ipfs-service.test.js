import { expect } from "chai"
import IpfsService from "../src/ipfs-service"
import { listings, ipfsHashes, ipfsConfig } from "./fixtures"

const clearCache = ipfsService => {
  const { mapCache } = ipfsService
  Object.keys(mapCache.__data__).forEach(key => mapCache.del(key))
}

const ipfsEnv = "local"
const methodNames = ["submitFile", "getFile", "gatewayUrlForHash"]

describe("7.IpfsService", () => {
  let ipfsService

  beforeEach(() => {
    // ipfsService = new IpfsService({
    //   ipfsDomain: "127.0.0.1",
    //   ipfsApiPort: "5002",
    //   ipfsGatewayPort: "8081",
    //   ipfsGatewayProtocol: "http"
    // })
    ipfsService = new IpfsService(ipfsConfig)
  })

  methodNames.forEach(methodName => {
    it(`should have ${methodName} method`, () => {
      expect(ipfsService[methodName]).to.be.an.instanceof(Function)
    })
  })

  describe("constructor", () => {
    it("should default to o2oprotocol", () => {
      var service = new IpfsService()
      expect(service.gateway).to.equal("https://ipfs.o2oprotocol.com")
      expect(service.api).to.equal("https://ipfs.o2oprotocol.com")
    })

    it("should use specified port if not protocol default", () => {
      var service = new IpfsService({ ipfsGatewayPort: "8081" })
      expect(service.gateway).to.equal(
        "https://ipfs.o2oprotocol.com:8081"
      )

      service = new IpfsService({
        ipfsGatewayProtocol: "http",
        ipfsGatewayPort: "8081"
      })
      expect(service.gateway).to.equal("http://ipfs.o2oprotocol.com:8081")

      service = new IpfsService({
        ipfsGatewayProtocol: "http",
        ipfsApiPort: "8081"
      })
      expect(service.api).to.equal("http://ipfs.o2oprotocol.com:8081")
    })

    it("should use default protocol port if given port is empty", () => {
      var service = new IpfsService({ ipfsGatewayPort: "" })
      expect(service.gateway).to.equal("https://ipfs.o2oprotocol.com")
    })
  })

  describe("submitFile", () => {
    listings.forEach(({ data, ipfsHash }) => {
      it("should successfully submit file", async () => {
        const submittedHash = await ipfsService.submitFile(data)
        expect(submittedHash).to.equal(ipfsHash)

        const cachedData = await ipfsService.getFile(submittedHash)
        expect(cachedData).to.deep.eql(data)

        clearCache(ipfsService)

        const submittedData = await ipfsService.getFile(ipfsHash)
        expect(submittedData).to.deep.eql(data)
      })
    })
  })

  describe("getFile", () => {
    // Skipped because of https://github.com/o2oprotocol/o2oprotocol/issues/27
    xit("should reject when listing cannot be found", done => {
      ipfsService
        .getFile("QmWHyrPWQnsz1wxHR219ooJDYTvxJPyZuDUPSDpdsAovN5")
        .then(done.fail, error => {
          expect(error).to.match(/Got ipfs cat error/)
          done()
        })
    })
  })

  describe("gatewayUrlForHash", () => {
    ipfsHashes.forEach(({ ipfsHash, url }) => {
      it(`should correctly create url for IPFS hash ${ipfsHash}`, () => {
        const result = ipfsService.gatewayUrlForHash(ipfsHash)
        expect(result).to.equal(url[ipfsEnv])
      })
    })
  })
})
