import { expect } from "chai"
import IpfsService from "../src/ipfs-service"
import { listings, ipfsHashes, ipfsConfig } from "./fixtures"

const clearCache = ipfsService => {
  const { mapCache } = ipfsService
  Object.keys(mapCache.__data__).forEach(key => mapCache.del(key))
}

const ipfsEnv = "local"
const methodNames = ["submitFile", "getFile", "gatewayUrlForHash"]

describe("IpfsService", () => {
  let ipfsService

  beforeEach(() => {
    ipfsService = new IpfsService(ipfsConfig)
  })

  methodNames.forEach(methodName => {
    it(`should have ${methodName} method`, () => {
      expect(ipfsService[methodName]).to.be.an.instanceof(Function)
    })
  })

  describe("constructor", () => {
    it("should default to origin", () => {
      var service = new IpfsService()
      expect(service.gateway).to.equal("https://gateway.o2oprotocol.io")
      expect(service.api).to.equal("https://gateway.o2oprotocol.io")
    })

    it("should use specified port if not protocol default", () => {
      var service = new IpfsService({ ipfsGatewayPort: "8080" })
      expect(service.gateway).to.equal(
        "https://gateway.o2oprotocol.io:8080"
      )

      service = new IpfsService({
        ipfsGatewayProtocol: "http",
        ipfsGatewayPort: "8080"
      })
      expect(service.gateway).to.equal("http://gateway.o2oprotocol.io:8080")

      service = new IpfsService({
        ipfsGatewayProtocol: "http",
        ipfsApiPort: "8080"
      })
      expect(service.api).to.equal("http://gateway.o2oprotocol.io:8080")
    })

    it("should use default protocol port if given port is empty", () => {
      var service = new IpfsService({ ipfsGatewayPort: "" })
      expect(service.gateway).to.equal("https://gateway.o2oprotocol.io")
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
