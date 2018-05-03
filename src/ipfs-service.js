/**
 * IPFS interface
 */

const ipfsAPI = require("ipfs-api")
const MapCache = require("map-cache")
const promisify = require("util.promisify")

class IpfsService {
  constructor(options) {
    // Default option point to o2oprotocol
    const defaultOption = {
      ipfsDomain: "gateway.o2oprotocol.io",
      ipfsApiPort: "5001",
      ipfsGatewayPort: "",
      ipfsProtocol: "https"
    }

    // Merged option
    const mergedOption = Object.assign({}, defaultOption, options)

    // Instance properties
    this.ipfsConfig = mergedOption
    this.mapCache = new MapCache()

    const { ipfsDomain, ipfsApiPort, ipfsProtocol } = this.ipfsConfig
    this.ipfs = ipfsAPI(ipfsDomain, ipfsApiPort, { protocol: ipfsProtocol })

    //@TODO as private node, shoudl run swarm peers?
    this.ipfs.swarm.peers(error => {
      if (error) {
        console.error("IPFS - Can't connect to the IPFS API.")
        console.error(error)
      }
    })
  }

  submitFile = async jsonData => {
    const file = {
      path: "file.json",
      content: JSON.stringify(jsonData)
    }

    const addFile = promisify(this.ipfs.files.add.bind(this.ipfs.files))

    let response
    try {
      response = await addFile([file])
    } catch (error) {
      console.error("Can't connect to IPFS.", error)
      throw new Error("Can't connect to IPFS. Failure to submit file to IPFS")
    }

    const ipfsHashStr = response[0].hash
    if (!ipfsHashStr) {
      throw new Error("Failure to submit file to IPFS")
    }

    this.mapCache.set(ipfsHashStr, jsonData)
    return ipfsHashStr
  }

  getFile = async ipfsHashStr => {
    // Check for cache hit
    if (this.mapCache.has(ipfsHashStr)) {
      return this.mapCache.get(ipfsHashStr)
    }

    const catFile = promisify(this.ipfs.files.cat.bind(this.ipfs.files))

    // Get from IPFS network
    let stream
    try {
      stream = await catFile(ipfsHashStr)
    } catch (error) {
      console.error(error)
      throw new Error("Got ipfs cat err:" + error)
    }

    return await new Promise((resolve, reject) => {
      let res = ""
      stream.on("data", chunk => {
        res += chunk.toString()
      })
      stream.on("error", err => {
        reject("Got ipfs cat stream err:" + err)
      })
      stream.on("end", () => {
        let parsedResponse
        try {
          parsedResponse = JSON.parse(res)
        } catch (error) {
          reject(`Failed to parse response JSON: ${error}`)
          return
        }
        this.mapCache.set(ipfsHashStr, parsedResponse)
        resolve(parsedResponse)
      })
    })
  }

  gatewayUrlForHash = ipfsHashStr => {
    const { ipfsProtocol, ipfsDomain, ipfsGatewayPort } = this.ipfsConfig

    const defaultPort = ipfsProtocol === "https" ? "443" : "80"
    const gatewayPort = String(ipfsGatewayPort)

    const shouldAddPort = gatewayPort.length > 0 && gatewayPort !== defaultPort
    const port = shouldAddPort ? `:${gatewayPort}` : ""

    return `${ipfsProtocol}://${ipfsDomain}${port}/ipfs/${ipfsHashStr}`
  }
}

export default IpfsService
