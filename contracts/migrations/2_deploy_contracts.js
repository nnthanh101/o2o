// Load contracts
var ListingsRegistry = artifacts.require("./ListingsRegistry.sol");
var Listing = artifacts.require("./Listing.sol");
var UserRegistry = artifacts.require("./UserRegistry.sol");
var PurchaseLibrary = artifacts.require("./PurchaseLibrary.sol");
var O2OIdentity = artifacts.require("./O2OIdentity.sol");

// Post deploy
const _ = console.log
const {pushABIToIpfs} = require("./pushABIToIpfs")
module.exports = function(deployer, network) {
  return deployer.then(() => {
    return deployContracts(deployer)
  })
}

async function deployContracts(deployer) {

try{  
  await deployer.deploy(PurchaseLibrary);
  await deployer.link(PurchaseLibrary, ListingsRegistry)
  await deployer.link(PurchaseLibrary, Listing)
  await deployer.deploy(ListingsRegistry);
  await deployer.deploy(UserRegistry);
  await deployer.deploy(O2OIdentity);

  const list = []
  await Promise.all(list)
  const ipfsHashes = await pushABIToIpfs()

  _("[ABI] Hash")
    ipfsHashes.forEach(ipfsHash => _(`${ipfsHash.hash}`))
  }catch(err){
    _("[INFO][Truffle deploy][ERR]", err.message, err.stack)
  throw new Error()
}

}