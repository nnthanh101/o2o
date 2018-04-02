const UserRegistry = artifacts.require("UserRegistry.sol");
const Listing = artifacts.require("Listing.sol")
const ListingsRegistry = artifacts.require("ListingsRegistry.sol");

module.exports = function(deployer) {
  deployer.deploy(UserRegistry);
  deployer.deploy(Listing);
  deployer.deploy(ListingsRegistry);
};