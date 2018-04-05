// For now, we are just wrapping the methods that are already in
// contractService and ipfsService.

module.exports = {
  allIds: async function() {
    return await this.o2oprotocol.contractService.getAllListingIds();
  },

  getByIndex: async function(listingIndex) {
    const contractData = await this.o2oprotocol.contractService.getListing(
      listingIndex
    );
    const ipfsData = await this.o2oprotocol.ipfsService.getFile(
      contractData.ipfsHash
    );
    // ipfsService should have already checked the contents match the hash,
    // and that the signature validates

    // We explicitly set these fields to white list the allowed fields.
    const listing = {
      name: ipfsData.data.name,
      category: ipfsData.data.category,
      description: ipfsData.data.description,
      location: ipfsData.data.location,
      pictures: ipfsData.data.pictures,

      address: contractData.address,
      index: contractData.index,
      ipfsHash: contractData.ipfsHash,
      sellerAddress: contractData.lister,
      price: contractData.price,
      unitsAvailable: contractData.unitsAvailable
    };

    // TODO: Validation

    return listing;
  },

  create: async function(data, schemaType) {
    if (data.price == undefined) {
      throw "You must include a price";
    }
    if (data.name == undefined) {
      throw "You must include a name";
    }
    return this.o2oprotocol.o2oService.submitListing(
      { formData: data },
      schemaType
    );
  },

  buy: async function(listingAddress, unitsToBuy, ethToPay) {
    return await this.o2oprotocol.contractService.buyListing(
      listingAddress,
      unitsToBuy,
      ethToPay
    );
  }
};
