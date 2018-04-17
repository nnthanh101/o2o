const fs = require("fs")
const path = require("path")
const readChunk = require("read-chunk")
const fileType = require("file-type")

// const imgPath = path.resolve(__dirname, "samsung-galaxy-a7-2017.png")

const convertToBrowserBase64 = imgPath => {
  const base64 = fs.readFileSync(imgPath, "base64")
  const buffer = readChunk.sync(imgPath, 0, 4100)
  const { mime } = fileType(buffer)
  const fileName = path.basename(imgPath)
  return `data:${mime};name=${fileName};base64,${base64}`
}

// const browserbase64 = convertToBrowserBase64(imgPath)
// console.log("browserbase64", browserbase64)

const findCatById = (_cats, id) => {
  const len = _cats.length
  if (len === 0) return -1

  for (let i = 0; i < len; i++) {
    if (_cats[i]["category_id"] === id) return _cats[i]
    const _cat = findCatById(_cats[i]["children"], id)
    if (_cat !== -1) return _cat
  }
  return -1
}

const convertToListingProducts = ({ categories, products, baseImageDir = "product-images", lang = "en" }) => {
  const localCats = categories[lang]
  const ETH_USD = process.env.ETH_USD || 516.34
  return products.map(product => {
    const { name, category_id: category_ids, body_html: descriptions, price: usdPrice, image: imageName } = product
    const ethPrice = +Number(usdPrice / ETH_USD).toFixed(2)
    const firstCatId = category_ids[0]
    const cat = findCatById(localCats.children, firstCatId)
    const categoryName = cat.name
    const unitsAvailable = Math.floor(Math.random() * 15 + 10)
    const imgPath = path.resolve(__dirname, baseImageDir, categoryName, imageName)
    const pictureBase64 = convertToBrowserBase64(imgPath)
    const pictures = [pictureBase64]
    const firstDescriptionHtml = descriptions[0]
    return {
      name,
      pictures,
      description: firstDescriptionHtml,
      unitsAvailable,
      price: ethPrice,
      category: categoryName
    }
  })
}

module.exports = {
  convertToBrowserBase64,
  findCatById,
  convertToListingProducts
}
