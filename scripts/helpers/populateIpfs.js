const fs = require("fs");
const path = require("path");
const readChunk = require("read-chunk");
const fileType = require("file-type");
const axios = require("axios");
const os = require("os");
const md5 = require("md5");
const ipfsAPI = require("ipfs-api");
const bs58 = require("bs58");
const shelljs = require("shelljs")

// Return bytes32 hex string from base58 encoded ipfs hash,
// stripping leading 2 bytes from 34 byte IPFS hash
// Assume IPFS defaults: function:0x12=sha2, size:0x20=256 bits
// E.g. "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL" -->
// "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
const getBytes32FromIpfsHash = ipfsListing => {
  return (
    "0x" +
    bs58
      .decode(ipfsListing)
      .slice(2)
      .toString("hex")
  );
};

const findMime = imgPath => {
  const buffer = readChunk.sync(imgPath, 0, 4100);
  const { mime } = fileType(buffer);
  return mime;
}

/**
 * Convert image file to browser base64
 * @param imgPath
 * @returns {string|null}
 */
const convertToBrowserBase64 = imgPath => {
  try {
    const base64 = fs.readFileSync(imgPath, "base64");
    const mime = findMime(imgPath);
    const fileName = path.basename(imgPath);
    return `data:${mime};name=${fileName};base64,${base64}`;
  } catch (err) {
    console.log("[ERR]", err.message, err.stack);
    return null;
  }
};

const fetchFile = axios.create({ timeout: 10000 });

const storeDownloadFile = async (fileUrl, filePath, fetchOptions = {}) => {
  // Default fitePath in sampleDir
  filePath = filePath || path.join(os.tmpdir(), md5(fileUrl));

  const streamOpt = {
    url: fileUrl,
    method: "get",
    responseType: "stream",
    ...fetchOptions
  };
  const downloadStream = await fetchFile(streamOpt).then(res => res.data);
  const writeFileStream = fs.createWriteStream(filePath);

  const stream = downloadStream.pipe(writeFileStream);

  return new Promise((resolve, reject) => {
    stream.on("finish", resolve.bind(null, filePath));
    stream.on("error", reject);
  });
};

const createListingJson = async (ipfs, sampleTestCases, sampleDir) => {
  const waitList = sampleTestCases.map(async testCase => {
    const { pictures: urls } = testCase;

    const pictures = await Promise.all(
      urls.map(async url => {
        const filePath = await storeDownloadFile(url);
        const base64 = convertToBrowserBase64(filePath);
        return base64;
      })
    );

    const listing = { ...testCase, pictures };

    const fileName = path.join(
      sampleDir,
      `${testCase.name.replace(/\s/g, "")}.json`
    );

    fs.writeFileSync(fileName, JSON.stringify(listing));

    const result = await new Promise((resolve, reject) => {
      ipfs.files.add([fileName], (err, result) => {
        if (err) return reject(err);
        resolve(result[0]);
      });
    });

    const hashByte32 = getBytes32FromIpfsHash(result.hash);
    console.log(`${path.basename(fileName).substring(0, 10)}... hashByte32:`, hashByte32);

    return {
      ipfsHash: hashByte32,
      price: listing.price,
      unitsAvailable: listing.unitsAvailable
    };
  });

  const listings = await Promise.all(waitList);
  const listingPath = path.join(sampleDir, "listings.json");
  fs.writeFileSync(listingPath, JSON.stringify(listings, null, 2));
  return listingPath;
};


const populateToIpfs = async (ipfs, fixtureType) => {
  console.log("Populate Sample Data...")
  
  const filePathArr = ["..", "..", "test", "fixtures", fixtureType, "samples.json"]
  const sampleFile  = path.join(__dirname, ...filePathArr)

  console.log("sampleFile", sampleFile)
  if(!fs.existsSync(sampleFile)) return null

  const samples = require(sampleFile)
  const sampleDir = path.join(__dirname, "..", "..", "..", "build", "sample-data");
  shelljs.mkdir("-p", sampleDir)
  
  const listingPath = await createListingJson(ipfs, samples, sampleDir);
  
  console.log("listingPath", listingPath)
  console.log("Populated")
}

// ;(async () => {
//   const ipfs = ipfsAPI("localhost", "5001", { protocol: "http" });
//   const listingPath = await populateToIpfs(ipfs, "ecommerce")
// })()

module.exports = populateToIpfs