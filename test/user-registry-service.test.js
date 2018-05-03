import { expect } from "chai"
import UserRegistryService from "../src/user-registry-service"
import Web3 from "web3"

const methodNames = ["create", "get"]

describe("UserRegistryService", () => {
  let userRegistryService

  beforeEach(() => {
    let provider = new Web3.providers.HttpProvider("http://localhost:8545")
    let web3 = new Web3(provider)
    userRegistryService = new UserRegistryService({ web3 })
  })

  methodNames.forEach(methodName => {
    it(`should have ${methodName} method`, () => {
      expect(userRegistryService[methodName]).to.be.an.instanceof(Function)
    })
  })
  // TODO: Real tests
})
