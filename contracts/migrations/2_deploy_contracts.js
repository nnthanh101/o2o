var ListingsRegistry = artifacts.require("./ListingsRegistry.sol");
var Listing = artifacts.require("./Listing.sol");
var UserRegistry = artifacts.require("./UserRegistry.sol");
var PurchaseLibrary = artifacts.require("./PurchaseLibrary.sol");
var O2OIdentity = artifacts.require("./O2OIdentity.sol");
const pushABIToIpfs = require("./pushABIToIpfs");

module.exports = function(deployer, network) {
  return deployer.then(() => {
    return deployContracts(deployer)
  })
}

async function deployContracts(deployer) {
  await deployer.deploy(PurchaseLibrary);
  await deployer.link(PurchaseLibrary, ListingsRegistry)
  await deployer.link(PurchaseLibrary, Listing)
  await deployer.deploy(ListingsRegistry);
  await deployer.deploy(UserRegistry);
  await deployer.deploy(O2OIdentity);

  const ipfsHashes = await pushABIToIpfs()
  ipfsHashes.forEach(ipfsHash => console.log(`${ipfsHash.path.substr(0, 16)}... -> ${ipfsHash.hash}`))
}