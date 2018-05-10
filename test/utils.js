const readFilePrefix = (filePath) => {
  const filename = path.basename(filePath);
  const match = filename.match(/(\d+\.)/)
  const prefix = match && match[1]
  return prefix;
}

module.exports = {
  readFilePrefix
}