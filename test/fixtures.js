export const ipfsHashes = [
  {
    ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    bytes32:
      "0x9d6c2be50f706953479ab9df2ce3edca90b68053c00b3004b7f0accbe1e8eedf",
    url: {
      default:
        "https://gateway.o2oprotocol.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
      local:
        "http://127.0.0.1:8080/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"
    }
  },
  {
    ipfsHash: "QmWHyrPWQnsz1wxHR219ooJDYTvxJPyZuDUPSDpdsAovN5",
    bytes32:
      "0x762e65d7166d5cf0eed8541a0b55a79002774f6ef086619202ef749a1bf8f3ba",
    url: {
      default:
        "https://gateway.o2oprotocol.io/ipfs/QmWHyrPWQnsz1wxHR219ooJDYTvxJPyZuDUPSDpdsAovN5",
      local:
        "http://127.0.0.1:8080/ipfs/QmWHyrPWQnsz1wxHR219ooJDYTvxJPyZuDUPSDpdsAovN5"
    }
  }
]

const testData = require("../contracts/test/TestData.json");
export const listings = [
  {
    data: {
      foo: "bar"
    },
    ipfsHash: testData.IPFS_HASH,
  }
export const ipfsConfig = {
  ipfsDomain: "localhost",
  ipfsApiPort: "5001",
  ipfsGatewayPort: "8080",
  ipfsProtocol: "http"
}
]