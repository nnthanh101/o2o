import UserRegistryContract from "../../build/contracts/UserRegistry.json"
import promisify from "util.promisify"
import contract from "truffle-contract"

class UserRegistryService {
  constructor(options) {
    // Fail soon when no web3 supply
    const { web3 } = options || {}
    if (!web3) throw new Error("Please provide 'web3' in options")

    this.web3 = web3
    this.userRegistryContract = contract(UserRegistryContract)
  }

  getUserRegistryInstance = async () => {
    try {
      const { userRegistryContract, web3 } = this
      userRegistryContract.setProvider(web3.currentProvider)
      return await userRegistryContract.deployed()
    } catch (error) {
      console.log(`Contract not deployed`)
      throw error
    }
  }

  //Creates a new user with attestation or proof payload data and stores in user-registry in relation to wallet ID
  create = async payload => {
    const { eth } = this.web3
    const accounts = await promisify(eth.getAccounts.bind(eth))()
    const walletId = accounts[0]

    try {
      const instance = await this.getUserRegistryInstance()
      const response = instance.createAnother.call(walletId, JSON.stringify(payload))
      console.log("user-registry-service found user:", response)
      return response
    } catch (error) {
      console.log("user-registry-service could not find user:", walletId)
      throw error
    }
  }

  //get user from from user-registry by their existing wallet ID
  get = async () => {
    const { eth } = this.web3
    const accounts = await promisify(eth.getAccounts.bind(eth))()
    const walletId = accounts[0]

    try {
      const instance = await this.getUserRegistryInstance()
      const response = instance.get.call(walletId)
      console.log("user-registry-service found user:", response)
      return response
    } catch (error) {
      console.log("user-registry-service could not find user:", walletId)
      throw error
    }
  }
}

export default UserRegistryService
