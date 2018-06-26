// const { spawn } = require('child_process')
const spawn = require("cross-spawn")
const path = require("path")
const minifyContracts = require('./minify-contracts')

const buildContracts = () => {
  return new Promise((resolve, reject) => {
    const cmd = path.join(__dirname, "..", "..", "node_modules", ".bin", "truffle")
    const contractsDir = path.join(__dirname, "..", "..", "contracts")
    console.log("cmd, contractsDir", cmd, contractsDir)
    
    const truffleCompile = spawn(cmd, ['compile'], { cwd: contractsDir })
    truffleCompile.stdout.pipe(process.stdout)
    truffleCompile.stderr.on('data', data => {
      reject(String(data))
    })
    truffleCompile.on('exit', code => {
      if (code === 0) {
        console.log('Truffle compile finished OK.')
      }
      minifyContracts()
      resolve()
    })
  })
}

module.exports = buildContracts
