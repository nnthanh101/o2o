const web3Utils = require('web3-utils')

const contractDefinition = artifacts.require("ClaimHolder")
const testData = require("../TestData.json");

const signature_1 = testData.SIGNATURE_1
const dataHash_1 = testData.DATAHASH_1

contract("ClaimHolder", accounts => {
  let instance
  let attestation_1 = {
    claimType: 1,
    scheme: 11,
    issuer: accounts[1],
    signature: signature_1,
    data: dataHash_1,
    uri: "https://foo.bar/attestation1"
  }

  beforeEach(async function() {
    instance = await contractDefinition.new({ from: accounts[0] })
  })

  it("can add and get claim", async function() {
    let claimId = web3Utils.soliditySha3(
      attestation_1.issuer,
      attestation_1.claimType
    )
    await instance.addClaim(
      attestation_1.claimType,
      attestation_1.scheme,
      attestation_1.issuer,
      attestation_1.signature,
      attestation_1.data,
      attestation_1.uri,
      { from: accounts[0] }
    )
    let fetchedClaim = await instance.getClaim(claimId, { from: accounts[0] })
    assert.ok(fetchedClaim)
    let [ claimType, scheme, issuer, signature, data, uri ] = fetchedClaim
    assert.equal(claimType.toNumber(), attestation_1.claimType)
    assert.equal(scheme.toNumber(), attestation_1.scheme)
    assert.equal(issuer, attestation_1.issuer)
    assert.equal(signature, attestation_1.signature)
    assert.equal(data, attestation_1.data)
    assert.equal(uri, attestation_1.uri)
  })
})
