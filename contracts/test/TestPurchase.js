const Purchase = artifacts.require('Purchase.sol')
const Listing = artifacts.require('Listing.sol')

// Used to assert error cases
const isEVMError = function(err) {
  let str = err.toString()
  return str.includes("revert")
}

const ipfsHash = '0x6b14cac30356789cd0c39fec0acc2176c3573abdb799f3b17ccc6972ab4d39ba'
const price = web3.toBigNumber(web3.toWei('0.5', 'ether'))
const unitsAvailable = 42

// Enum values
const AWAITING_PAYMENT = 0 // Buyer hasn't paid full amount yet
const BUYER_PENDING = 1    // Waiting for buyer to confirm receipt
const SELLER_PENDING = 2   // Waiting for seller to confirm all is good
const IN_DISPUTE = 3       // We are in a dispute
const REVIEW_PERIOD = 4    // Time for reviews (only when transaction did not go through)
const COMPLETE = 5         // It's all over

contract('Purchase', accounts => {
  var buyer = accounts[0]
  var seller = accounts[1]
  var instance
  var listingInstance

  beforeEach(async function() {
    // Listing that we will be buying
    listingInstance = await Listing.new(
        seller,
        ipfsHash,
        price,
        unitsAvailable,
        {from: seller}
    )

    instance = await Purchase.new(
      listingInstance.address,
      buyer,
      {from: buyer}
    )
  })

  it('should start in stage 0', async function() {
    let newStage = await instance.stage()
    assert.equal(
      newStage,
      AWAITING_PAYMENT,
      'stage is AWAITING_PAYMENT'
    )
  })

  it('should fail when not enough paid', async function() {
    const valueToPay = (price.minus(10))
    await instance.pay({ from: buyer, value: valueToPay })
    let newStage = await instance.stage()
    assert.notEqual(
      newStage.toNumber(),
      BUYER_PENDING,
      'stage is not BUYER_PENDING'
    )
  })

  it('should progress when buyer pays full amount', async function() {
    const valueToPay = price
    await instance.pay({ from: buyer, value: valueToPay })
    let newStage = await instance.stage()
    assert.equal(
      newStage.toNumber(),
      BUYER_PENDING,
      'stage is now BUYER_PENDING'
    )
  })

  it('should progress when buyer pays full amount over multiple payments', async function() {
    const valueToPay = price.toNumber() / 3 // Odd this doesn't work with bignumber
    await instance.pay({ from: buyer, value: valueToPay })
    await instance.pay({ from: buyer, value: valueToPay })
    await instance.pay({ from: buyer, value: valueToPay+100 }) // extra in case of division remainder
    let newStage = await instance.stage()
    assert.equal(
      newStage.toNumber(),
      BUYER_PENDING,
      'stage is now BUYER_PENDING'
    )
  })

  it('should progress when buyer confirms receipt', async function() {
    const valueToPay = price
    await instance.pay({ from: buyer, value: valueToPay })
    // We immediately confirm receipt (in real world could be a while)
    await instance.buyerConfirmReceipt({ from: buyer })
    let newStage = await instance.stage()
    assert.equal(
      newStage.toNumber(),
      SELLER_PENDING,
      'stage is now SELLER_PENDING'
    )
  })

  it('should transfer the correct amount between buyer and seller', async function() {
    const GAS_PRICE = 1

    // Before
    const sellerBalanceBefore = await web3.eth.getBalance(seller)
    const buyerBalanceBefore = await web3.eth.getBalance(buyer)

    // Buyer pays
    const valueToPay = price
    const payTransaction = await instance.pay({ from: buyer, value: valueToPay, gasPrice: GAS_PRICE })
    const buyerBalanceAfter = await web3.eth.getBalance(buyer)
    const buyerTransactionCost = web3.toBigNumber(payTransaction.receipt.gasUsed * GAS_PRICE)
    const buyerExpectedBalance = buyerBalanceBefore.minus(buyerTransactionCost).minus(price)

    // Buyer confirms
    await instance.buyerConfirmReceipt({ from: buyer })

    // Seller collects
    const payoutTransaction = await instance.sellerGetPayout({ from: seller, gasPrice: GAS_PRICE })
    const sellerBalanceAfter = await web3.eth.getBalance(seller)
    const sellerTransactionCost = web3.toBigNumber(payoutTransaction.receipt.gasUsed * GAS_PRICE)
    const sellerExpectedBalance = sellerBalanceBefore.minus(sellerTransactionCost).plus(price)

    // console.log(`sellerBalanceBefore: ${sellerBalanceBefore}`)
    // console.log(`buyerBalanceBefore: ${buyerBalanceBefore}`)
    // console.log(`buyerBalanceAfter : ${buyerBalanceAfter}`)
    // console.log(`sellerBalanceAfter : ${sellerBalanceAfter}`)
    // console.log(`buyerdif : ${buyerBalanceAfter-buyerBalanceBefore}`)
    // console.log(`sellerdif: ${sellerBalanceAfter-sellerBalanceBefore}`)
    // console.log(`sellerExpectedBalance: ${sellerExpectedBalance}`)
    // console.log(`sellerexpecteddif: ${sellerBalanceAfter-sellerExpectedBalance}`)
    
    assert(buyerBalanceAfter.eq(buyerExpectedBalance), "Buyer should spend the correct amount")
    assert(sellerBalanceAfter.eq(sellerExpectedBalance), "Seller should receive exactly their money")

  })

})



contract('Purchase', accounts => {
  var buyer = accounts[0]
  var seller = accounts[1]
  var purchase
  var listing
  var totalPrice = 48
  var initialPayment = 6


  describe("Success path flow", async () => {

    before(async () => {
      listing = await Listing.new(
        seller,
        ipfsHash,
        totalPrice,
        unitsAvailable,
        { from: seller }
      )
    })

    it("should create and link the new purchase", async () => {
      const unitsToBuy = 1
      const buyTransaction = await listing.buyListing(
        unitsToBuy,
        { from: buyer, value: initialPayment }
      )
      const listingPurchasedEvent = buyTransaction.logs.find((e) => e.event == "ListingPurchased")
      purchase = await Purchase.at(listingPurchasedEvent.args._purchaseContract)
      
      assert.equal(await listing.getPurchase(0), purchase.address)
      assert.equal(await purchase.listingContract(), listing.address)
      assert.equal((await purchase.stage()).toNumber(), AWAITING_PAYMENT)
    })

    it("should allow buyer to pay", async () => {
      await purchase.pay({ from: buyer, value: totalPrice - initialPayment })
      assert.equal((await purchase.stage()).toNumber(), BUYER_PENDING)
    })

    it("should allow buyer to confirm reciept", async () => {
      await purchase.buyerConfirmReceipt({ from: buyer })
      assert.equal((await purchase.stage()).toNumber(), SELLER_PENDING)
    })

    it("should allow seller to collect their money", async () => {
      await purchase.sellerGetPayout({ from: seller })
      assert.equal((await purchase.stage()).toNumber(), COMPLETE)
    })


  })


})