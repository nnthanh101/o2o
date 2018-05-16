// const { spawn } = require('child_process')
const spawn = require("cross-spawn")
const path = require("path")

const testContracts = () => {
  return new Promise((resolve, reject) => {
    const cmd = path.join(__dirname, "..", "..", "node_modules", ".bin", "truffle")
    const contractsDir = path.join(__dirname, "..", "..", "contracts")
    console.log("cmd, contractsDir", cmd, contractsDir)

    const truffleTest = spawn(cmd, ['test', '--compile-all'], { cwd: contractsDir })
    truffleTest.stdout.pipe(process.stdout)
    truffleTest.stderr.on('data', data => {
      reject(String(data))
    })
    truffleTest.on('exit', code => {
      if (code === 0) {
        resolve()
      } else {
        reject('Contract tests failed')
      }
    })
  })
}

module.exports = testContracts
