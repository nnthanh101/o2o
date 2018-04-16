//TODO: Replace with async load ABI from ipfs
import ListingsRegistryContract from "../../build/contracts/ListingsRegistry.json"
import ListingContract from "../../build/contracts/Listing.json"
import UserRegistryContract from "../../build/contracts/UserRegistry.json"

import bs58 from "bs58"
import contract from "truffle-contract"
import promisify from "util.promisify"

class ContractService {
  constructor(options) {
    // Fail soon when no web3 supply
    const { web3 } = options || {}
    if (!web3) throw new Error("Please provide 'web3' in options")

    this.listingsRegistryContract = contract(ListingsRegistryContract)
    this.listingContract = contract(ListingContract)
    this.userRegistryContract = contract(UserRegistryContract)
    this.web3 = web3
  }

  // Return bytes32 hex string from base58 encoded ipfs hash,
  // stripping leading 2 bytes from 34 byte IPFS hash
  // Assume IPFS defaults: function:0x12=sha2, size:0x20=256 bits
  // E.g. "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL" -->
  // "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
  getBytes32FromIpfsHash(ipfsListing) {
    const hex = bs58
      .decode(ipfsListing)
      .slice(2)
      .toString("hex")
    return `0x${hex}`
  }

  // Return base58 encoded ipfs hash from bytes32 hex string,
  // E.g. "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
  // --> "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL"
  getIpfsHashFromBytes32(bytes32Hex) {
    // Add our default ipfs values for first 2 bytes:
    // function:0x12=sha2, size:0x20=256 bits
    // and cut off leading "0x"
    const hashHex = "1220" + bytes32Hex.slice(2)
    const hashBytes = Buffer.from(hashHex, "hex")
    const hashStr = bs58.encode(hashBytes)
    return hashStr
  }

  submitListing = async (ipfsListing, ethPrice, units) => {
    try {
      const { eth } = this.web3

      const accounts = await promisify(eth.getAccounts.bind(eth))()
      const instance = await this.getListingsRegistryInstance()

      const weiToGive = this.web3.toWei(ethPrice, "ether")
      // Note we cannot get the listingId returned by our contract.
      // See: https://forum.ethereum.org/discussion/comment/31529/#Comment_31529
      return instance.create(this.getBytes32FromIpfsHash(ipfsListing), weiToGive, units, {
        from: accounts[0],
        gas: 4476768
      })
    } catch (error) {
      console.error("Error submitting to the Ethereum blockchain: " + error)
      throw error
    }
  }

  getListingsRegistryInstance = async () => {
    const { listingsRegistryContract, web3 } = this

    try {
      listingsRegistryContract.setProvider(web3.currentProvider)
      return await listingsRegistryContract.deployed()
    } catch (error) {
      console.log(`Contract not deployed`)
      throw error
    }
  }

  getAllListingIds = async () => {
    const range = (start, length) => {
      const arr = new Array(length).fill(null)
      return arr.map((element, index) => index + start)
    }

    try {
      const instance = await this.getListingsRegistryInstance()
      const listingsLength = await instance.listingsLength.call()
      return range(0, Number(listingsLength))
    } catch (error) {
      console.log(`Can't get number of listings.`)
      throw error
    }
  }

  getListing = async listingId => {
    try {
      const instance = await this.getListingsRegistryInstance()
      const listing = await instance.getListing.call(listingId)

      // Listing is returned as array of properties.
      // IPFS hash (as bytes32 hex string) is in results[2]
      // Convert it to regular IPFS base-58 encoded hash
      // Address of Listing contract is in: listing[0]
      const listingObject = {
        index: listingId,
        address: listing[0],
        lister: listing[1],
        ipfsHash: this.getIpfsHashFromBytes32(listing[2]),
        price: this.web3.fromWei(listing[3], "ether").toNumber(),
        unitsAvailable: listing[4].toNumber()
      }

      return listingObject
    } catch (error) {
      throw new Error(`Error fetching listingId: ${listingId}`)
    }
  }

  buyListing = async (listingAddress, unitsToBuy, ethToGive) => {
    // TODO: Shouldn't we be passing wei to this function, not eth?
    const buyListingMsg = `request to buy listing  ${listingAddress}, for this many units ${unitsToBuy} units. Total eth to send: ${ethToGive}`
    console.log(buyListingMsg)

    const { currentProvider, eth } = this.web3
    this.listingContract.setProvider(currentProvider)

    const accounts = await promisify(eth.getAccounts.bind(eth))()
    const listing = await this.listingContract.at(listingAddress)
    const weiToGive = this.web3.toWei(ethToGive, "ether")

    // TODO (SRJ): is gas needed?
    const transOption = { from: accounts[0], value: weiToGive, gas: 4476768 }
    const transactionReceipt = await listing.buyListing(unitsToBuy, transOption)
    return transactionReceipt
  }

  async waitTransactionFinished(transactionHash, pollIntervalMilliseconds = 1000) {
    console.log("Waiting for transaction")
    console.log(transactionHash)
    const web3 = this.web3
    const blockNumber = await new Promise((resolve, reject) => {
      if (!transactionHash) {
        reject(`Invalid transactionHash passed: ${transactionHash}`)
      }
      let txCheckTimer = setInterval(txCheckTimerCallback, pollIntervalMilliseconds)
      function txCheckTimerCallback() {
        web3.eth.getTransaction(transactionHash, (error, transaction) => {
          if (transaction.blockNumber) {
            console.log(`Transaction mined at block ${transaction.blockNumber}`)
            console.log(transaction)
            // TODO: Wait maximum number of blocks
            // TODO: Confirm transaction *sucessful* with getTransactionReceipt()
            resolve(transaction.blockNumber)
            clearInterval(txCheckTimer)
          }
        })
      }
    })
    return blockNumber
  }
}

export default ContractService
