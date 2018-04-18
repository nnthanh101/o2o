const fs = require("fs")
const path = require("path")
const readChunk = require("read-chunk")
const fileType = require("file-type")

const BASE_IMG_DIR = path.resolve("product-data", "images")
const DEFAULT_LANG = "en"

/**
 * Convert image file to browser base64
 * @param imgPath
 * @returns {string|null}
 */
const convertToBrowserBase64 = imgPath => {
  try {
    const base64 = fs.readFileSync(imgPath, "base64")
    const buffer = readChunk.sync(imgPath, 0, 4100)
    const { mime } = fileType(buffer)
    const fileName = path.basename(imgPath)
    return `data:${mime};name=${fileName};base64,${base64}`
  } catch (err) {
    console.log("[ERR]", err.message, err.stack)
    return null
  }
}

/**
 * Find category info through category_id
 * Categories as hierarchy with nested child
 * Go to category & cateogry's children to find out
 * @param categories
 * @param id
 * @returns {*}
 */
const findCatById = (categories, id) => {
  const len = categories.length
  if (len === 0) return -1

  for (let i = 0; i < len; i++) {
    if (categories[i]["category_id"] === id) return categories[i]
    const _cat = findCatById(categories[i]["children"], id)
    if (_cat !== -1) return _cat
  }
  return -1
}

/**
 * Convert Samsung product to Listing product format
 * @param categories
 * @param products
 * @param baseImgDir
 * @param lang
 */
const convertToListingProducts = ({ categories, products, baseImgDir = BASE_IMG_DIR, lang = DEFAULT_LANG }) => {
  const localeCats = categories[lang]
  const ETH_USD = process.env.ETH_USD || 516.34

  return products.map(product => {
    const { name, category_id: category_ids, body_html: descriptions, price: usdPrice, image: imageName } = product
    // Convert to ETH price
    const ethPrice = +Number(usdPrice / ETH_USD).toFixed(2)

    // Get out category's name base on ID
    const firstCatId = category_ids[0]
    const cate = findCatById(localeCats.children, firstCatId)
    const categoryName = cate && cate.name

    // Random available unit 15->25
    const unitsAvailable = Math.floor(Math.random() * 15 + 10)

    // Product's pictures as browser base64
    const imgPath = path.resolve(__dirname, baseImgDir, categoryName, imageName)
    const pictureBase64 = convertToBrowserBase64(imgPath)
    const pictures = (pictureBase64 && [pictureBase64]) || []

    // Quick description
    const firstDescriptionHtml = descriptions[0]

    return {
      name,
      pictures,
      unitsAvailable,
      description: firstDescriptionHtml,
      price: ethPrice,
      category: categoryName
    }
  })
}

module.exports = {
  findCatById,
  convertToBrowserBase64,
  convertToListingProducts
}
