import Web3 from "web3"
import { expect } from "chai"
import O2OProtocol from "../src/index.js"

describe("Listing Resource", () => {
  let o2oprotocol
  let testListingIds
  let waitCreate
  const LISTING_NAME = "1972 Geo Metro 255K"

  before(async () => {
    // web3
    const provider = new Web3.providers.HttpProvider("http://localhost:8545")
    const web3 = new Web3(provider)

    // ipfsConfig
    const ipfsConfig = {
      ipfsDomain: "localhost",
      ipfsApiPort: "5001",
      ipfsGatewayPort: "8080",
      ipfsProtocol: "http"
    }

    o2oprotocol = new O2OProtocol({ web3, ipfsConfig })
    testListingIds = await o2oprotocol.contractService.getAllListingIds()
  })

  it("should get all listing ids", async () => {
    const ids = await o2oprotocol.listings.allIds()
    expect(ids.length).to.be.greaterThan(1)
  })

  it("should create a ()listing", async () => {
    const listingData = {
      name: LISTING_NAME,
      category: "Cars & Trucks",
      location: "New York City",
      description:
        "The American auto-show highlight reel will be disproportionately concentrated on the happenings in New York.",
      pictures: undefined,
      price: 3.3
    }
    const schema = "for-sale"
    waitCreate = await o2oprotocol.listings.create(listingData, schema)
    // Todo: Check that this worked after we have web3 approvals working
  })

  it("should get a listing", async () => {
    // Wait for test on create success
    await waitCreate

    // Read last one out & test get same listing
    const allList = await o2oprotocol.contractService.getAllListingIds()
    const lastListingIndex = allList[allList.length - 1]

    const listing = await o2oprotocol.listings.getByIndex(lastListingIndex)
    expect(listing.name).to.equal(LISTING_NAME)
    expect(listing.index).to.equal(allList[allList.length - 1])
  })

  it("should buy a listing", async () => {
    // Wait for test on create success
    await waitCreate
    // Test buy
    const allList = await o2oprotocol.contractService.getAllListingIds()
    const lastListingIndex = allList[allList.length - 1]
    const listing = await o2oprotocol.listings.getByIndex(lastListingIndex)
    const transaction = await o2oprotocol.listings.buy(listing.address, 1, listing.price * 1)
    //Todo: Currently this test will fail here with a timeout
    //  because we need to somehow get web3 approve this transaction
    // Todo: wait for transaction, then check that purchase was created.
    console.log(transaction)
  }).timeout(5000)
})
