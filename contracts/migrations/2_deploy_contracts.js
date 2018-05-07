// Load contracts
var ListingsRegistry = artifacts.require("./ListingsRegistry.sol");
var Listing = artifacts.require("./Listing.sol");
var UserRegistry = artifacts.require("./UserRegistry.sol");
var PurchaseLibrary = artifacts.require("./PurchaseLibrary.sol");

// Post deploy
const _ = console.log
const {pushABIToIpfs} = require("./pushABIToIpfs")

module.exports = async (deployer) => {
  try{
    deployer.deploy(PurchaseLibrary);
    deployer.link(PurchaseLibrary, ListingsRegistry)
    deployer.link(PurchaseLibrary, Listing)
    deployer.deploy(ListingsRegistry);
    deployer.deploy(UserRegistry);    

    const list = []
    await Promise.all(list)
    const ipfsHashes = await pushABIToIpfs()

    _("[ABI] Hash")
    ipfsHashes.forEach(ipfsHash => _(`${ipfsHash.hash}`))
  }catch(err){
    _("[INFO][Truffle deploy][ERR]", err.message, err.stack)
    throw new Error()
  }
  
};