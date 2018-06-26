var ListingsRegistry = artifacts.require("./ListingsRegistry.sol");
var Listing = artifacts.require("./Listing.sol");
var Purchase = artifacts.require("./Purchase.sol");
const fs = require("fs");
const path = require("path");


module.exports = function(deployer, network) {
  return deployer.then(() => {
    return deploy_sample_contracts(network)
  })
}

async function deploy_sample_contracts(network) {
  let accounts = await new Promise((resolve, reject) => {
    web3.eth.getAccounts((error, result) => {
      if (error) {
        reject(err)
      }
      resolve(result)
    })
  })

  const default_account = accounts[0]
  const a_seller_account = accounts[1]
  const a_buyer_account = accounts[2]
  const another_buyer_account = accounts[3]

  const listingsRegistry = await ListingsRegistry.deployed()

  const getListingContract = async transaction => {
    const index = transaction.logs.find(x => x.event == "NewListing").args._index
    const info = await listingsRegistry.getListing(index)
    const address = info[0]
    return Listing.at(address)
  }

  const buyListing = async (listing, qty, from) => {
    const price = await listing.price()
    const transaction = await listing.buyListing(qty, { from: from, value: price, gas: 4476768 })
    const address = transaction.logs.find(x => x.event == "ListingPurchased").args._purchaseContract
    return Purchase.at(address)
  }

  console.log(`default_account:       ${default_account}`)
  console.log(`a_seller_account:      ${a_seller_account}`)
  console.log(`a_buyer_account:       ${a_buyer_account}`)
  console.log(`another_buyer_account: ${another_buyer_account}`)

  console.log(`Add sample listings`)

  const listingSample = path.join(__dirname, "..", "..", "build", "sample-data", "listings.json");
  const hasSampleFile = fs.existsSync(listingSample)
  const transactions = [];

  if(!hasSampleFile) {
    console.log(`Sample file not found`, listingSample)
    return
  }
  
  const listings = require(listingSample)
  
  for(index in listings){
    const listing = listings[index]
    const {ipfsHash, price, unitsAvailable } = listing

    const trans = await listingsRegistry.create( 
      ipfsHash,
      web3.toWei(price, "ether"), 
      unitsAvailable,
      { from: a_seller_account }
    )
    
    transactions.push(trans)
  }
  
  const listing0 = listings[0]
  
  const ticketsTransaction = await listingsRegistry.create(
    listing0.ipfsHash,
    web3.toWei(listing0.price, "ether"),
    listing0.unitsAvailable,
    { from: default_account }
  )

  if (network === "development") { 
    console.log("Test Purchase")    
    // Creating ticket purchases at different stages
    const ticketsListing = await getListingContract(ticketsTransaction)
    let purchase

    purchase = await buyListing(ticketsListing, 1, a_buyer_account)

    purchase = await buyListing(ticketsListing, 1, a_buyer_account)
    await purchase.sellerConfirmShipped({ from: default_account })

    purchase = await buyListing(ticketsListing, 1, another_buyer_account)
    await purchase.sellerConfirmShipped({ from: default_account })
    await purchase.buyerConfirmReceipt(5, "", { from: another_buyer_account })

    purchase = await buyListing(ticketsListing, 1, another_buyer_account)
    await purchase.sellerConfirmShipped({ from: default_account })
    await purchase.buyerConfirmReceipt(3, "", { from: another_buyer_account })
    await purchase.sellerCollectPayout(4,"",{ from: default_account })
  }
}
