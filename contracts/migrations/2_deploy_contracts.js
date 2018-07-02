var ClaimHolder = artifacts.require("./ClaimHolder.sol")
var ClaimHolderLibrary = artifacts.require("./ClaimHolderLibrary.sol")
var ClaimHolderPresigned = artifacts.require("./ClaimHolderPresigned.sol")
var ClaimHolderRegistered = artifacts.require("./ClaimHolderRegistered.sol")
var KeyHolder = artifacts.require("./KeyHolder.sol")
var KeyHolderLibrary = artifacts.require("./KeyHolderLibrary.sol")
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

  await deployer.deploy(KeyHolderLibrary)

  await deployer.link(KeyHolderLibrary, KeyHolder)

  await deployer.link(KeyHolderLibrary, ClaimHolderLibrary)
  await deployer.deploy(ClaimHolderLibrary)

  await deployer.link(ClaimHolderLibrary, ClaimHolder)
  await deployer.link(KeyHolderLibrary, ClaimHolder)

  await deployer.link(ClaimHolderLibrary, ClaimHolderRegistered)
  await deployer.link(KeyHolderLibrary, ClaimHolderRegistered)

  await deployer.link(ClaimHolderLibrary, ClaimHolderPresigned)
  await deployer.link(KeyHolderLibrary, ClaimHolderPresigned)

  await deployer.link(ClaimHolderLibrary, O2OIdentity)
  await deployer.link(KeyHolderLibrary, O2OIdentity)
  await deployer.deploy(O2OIdentity);

  const ipfsHashes = await pushABIToIpfs()
  ipfsHashes.forEach(ipfsHash => console.log(`${ipfsHash.path.substr(0, 16)}... -> ${ipfsHash.hash}`))
}