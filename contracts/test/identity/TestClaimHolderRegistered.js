var Web3 = require("web3")

const ClaimHolderRegistered = artifacts.require("ClaimHolderRegistered")
const UserRegistry = artifacts.require("UserRegistry")
const testData = require("../TestData.json");

const signature_1 = testData.SIGNATURE_1
const signature_2 = testData.SIGNATURE_2
const dataHash_1 = testData.DATAHASH_1
const dataHash_2 = testData.DATAHASH_2

contract("ClaimHolderRegistered", accounts => {
  let claimHolderRegistered, userRegistry
  let attestation_1 = {
    claimType: 1,
    scheme: 1,
    issuer: accounts[1],
    signature: signature_1,
    data: dataHash_1,
    uri: ""
  }
  let attestation_2 = {
      claimType: 2,
      scheme: 1,
      issuer: accounts[2],
      signature: signature_2,
      data: dataHash_2,
      uri: ""
  }

  beforeEach(async function() {
    userRegistry = await UserRegistry.deployed()
    claimHolderRegistered = await ClaimHolderRegistered.new(userRegistry.address, { from: accounts[0] })
  })

  it("can add and get claim", async function() {
    let claimId = Web3.utils.soliditySha3(
      attestation_1.issuer,
      attestation_1.claimType
    )
    await claimHolderRegistered.addClaim(
      attestation_1.claimType,
      attestation_1.scheme,
      attestation_1.issuer,
      attestation_1.signature,
      attestation_1.data,
      attestation_1.uri,
      { from: accounts[0] }
    )
    let fetchedClaim = await claimHolderRegistered.getClaim(claimId, { from: accounts[0] })
    assert.ok(fetchedClaim)
    let [ claimType, scheme, issuer, signature, data, uri ] = fetchedClaim
    assert.equal(claimType.toNumber(), attestation_1.claimType)
    assert.equal(scheme.toNumber(), attestation_1.scheme)
    assert.equal(issuer, attestation_1.issuer)
    assert.equal(signature, attestation_1.signature)
    assert.equal(data, attestation_1.data)
    assert.equal(uri, attestation_1.uri)
  })

  it("can batch add claims", async function() {
    await claimHolderRegistered.addClaims(
      [ attestation_1.claimType, attestation_2.claimType ],
      [ attestation_1.issuer, attestation_2.issuer ],
      attestation_1.signature + attestation_2.signature.slice(2),
      attestation_1.data + attestation_2.data.slice(2),
      { from: accounts[0] }
    )

    let claimId_1 = Web3.utils.soliditySha3(
      attestation_1.issuer,
      attestation_1.claimType
    )
    let fetchedClaim_1 = await claimHolderRegistered.getClaim(claimId_1, { from: accounts[0] })
    assert.ok(fetchedClaim_1)
    let [ claimType_1, scheme_1, issuer_1, signature_1, data_1, uri_1 ] = fetchedClaim_1
    assert.equal(claimType_1.toNumber(), attestation_1.claimType)
    assert.equal(scheme_1.toNumber(), attestation_1.scheme)
    assert.equal(issuer_1, attestation_1.issuer)
    assert.equal(signature_1, attestation_1.signature)
    assert.equal(data_1, attestation_1.data)
    assert.equal(uri_1, attestation_1.uri)

    let claimId_2 = Web3.utils.soliditySha3(
      attestation_2.issuer,
      attestation_2.claimType
    )
    let fetchedClaim_2 = await claimHolderRegistered.getClaim(claimId_2, { from: accounts[0] })
    assert.ok(fetchedClaim_2)
    let [ claimType_2, scheme_2, issuer_2, signature_2, data_2, uri_2 ] = fetchedClaim_2
    assert.equal(claimType_2.toNumber(), attestation_2.claimType)
    assert.equal(scheme_2.toNumber(), attestation_2.scheme)
    assert.equal(issuer_2, attestation_2.issuer)
    assert.equal(signature_2, attestation_2.signature)
    assert.equal(data_2, attestation_2.data)
    assert.equal(uri_2, attestation_2.uri)
  })

  it("registers the user", async function() {
    let identityAddress = await userRegistry.users(accounts[0])
    assert.ok(identityAddress)
    assert.notEqual(identityAddress, "0x0000000000000000000000000000000000000000")
  })
})
