const fs = require("fs")
const path = require("path")
const readChunk = require("read-chunk")
const fileType = require("file-type")

const imgPath = path.resolve(__dirname, "samsung-galaxy-a7-2017.png")

const convertToBrowserBase64 = imgPath => {
  const base64 = fs.readFileSync(imgPath, "base64")
  const buffer = readChunk.sync(imgPath, 0, 4100)
  const { mime } = fileType(buffer)
  const fileName = path.basename(imgPath)
  return `data:${mime};name=${fileName};base64,${base64}`
}

// const browserbase64 = convertToBrowserBase64(imgPath)
// console.log("browserbase64", browserbase64)
module.exports = {
  convertToBrowserBase64
}
