// Load contracts
const UserRegistry = artifacts.require("UserRegistry.sol");
const Listing = artifacts.require("Listing.sol")
const ListingsRegistry = artifacts.require("ListingsRegistry.sol");

// Post deploy
const _ = console.log
const {pushABIToIpfs} = require("./pushABIToIpfs")

module.exports = async (deployer) => {
  try{
    const list = []
    list.push(deployer.deploy(UserRegistry));
    list.push(deployer.deploy(Listing));
    list.push(deployer.deploy(ListingsRegistry));

    await Promise.all(list)
    const ipfsHashes = await pushABIToIpfs()

    _("[ABI] Hash")
    ipfsHashes.forEach(ipfsHash => _(`${ipfsHash.hash}`))
  }catch(err){
    _("[INFO][Truffle deploy][ERR]", err.message, err.stack)
    throw new Error()
  }
};