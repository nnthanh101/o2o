var web3Utils = require('web3-utils')

const ClaimHolder = artifacts.require("ClaimHolder")
const ClaimHolderPresigned = artifacts.require("ClaimHolderPresigned")
const testData = require("../TestData.json");

const signature_1 = testData.SIGNATURE_1
const signature_2 = testData.SIGNATURE_2
const dataHash_1 = testData.DATAHASH_1
const dataHash_2 = testData.DATAHASH_2

// number of bytes in a hex string:
// num characters (without "0x") divided by 2
const numBytesInSignature = 65
const numBytesInDataHash = 32

contract("ClaimHolderPresigned", accounts => {
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

  it("should deploy identity with attestations", async function() {
    let instance = await ClaimHolderPresigned.new(
      [ attestation_1.claimType, attestation_2.claimType ],
      [ attestation_1.issuer, attestation_2.issuer ],
      attestation_1.signature + attestation_2.signature.slice(2),
      attestation_1.data + attestation_2.data.slice(2),
      [32, 32],
      { from: accounts[0] }
    )

    // Check attestation 1
    let claimId_1 = web3Utils.soliditySha3(attestation_1.issuer, attestation_1.claimType)
    let fetchedClaim_1 = await instance.getClaim(claimId_1, { from: accounts[0] })
    assert.ok(fetchedClaim_1)
    let [ claimType_1, scheme_1, issuer_1, signature_1, data_1, uri_1 ] = fetchedClaim_1
    assert.equal(claimType_1.toNumber(), attestation_1.claimType)
    assert.equal(scheme_1.toNumber(), attestation_1.scheme)
    assert.equal(issuer_1, attestation_1.issuer)
    assert.equal(signature_1, attestation_1.signature)
    assert.equal(data_1, attestation_1.data)
    assert.equal(uri_1, attestation_1.uri)

    // Check attestation 2
    let claimId_2 = web3Utils.soliditySha3(attestation_2.issuer, attestation_2.claimType)
    let fetchedClaim_2 = await instance.getClaim(claimId_2, { from: accounts[0] })
    assert.ok(fetchedClaim_2)
    let [ claimType_2, scheme_2, issuer_2, signature_2, data_2, uri_2 ] = fetchedClaim_2
    assert.equal(claimType_2.toNumber(), attestation_2.claimType)
    assert.equal(scheme_2.toNumber(), attestation_2.scheme)
    assert.equal(issuer_2, attestation_2.issuer)
    assert.equal(signature_2, attestation_2.signature)
    assert.equal(data_2, attestation_2.data)
    assert.equal(uri_2, attestation_2.uri)
  })
})