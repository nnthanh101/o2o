// const { spawn } = require('child_process')
const path = require("path")
const spawn = require("cross-spawn")
const minifyContracts = require('./minify-contracts')

const deployContracts = () => {
  return new Promise((resolve, reject) => {
    const cmd = path.join(__dirname, "..", "..", "node_modules", ".bin", "truffle")
    const contractsDir = path.join(__dirname, "..", "..", "contracts")
    console.log("cmd, contractsDir", cmd, contractsDir)
    const truffleMigrate = spawn(cmd, ['migrate', '--reset', '--compile-all'], { cwd: contractsDir })
    truffleMigrate.stdout.pipe(process.stdout)
    truffleMigrate.stderr.on('data', data => {
      reject(String(data))
    })
    truffleMigrate.on('exit', code => {
      if (code === 0) {
        console.log('Truffle migrate finished OK.')
      }
      minifyContracts()
      resolve()
    })
  })
}

module.exports = deployContracts
