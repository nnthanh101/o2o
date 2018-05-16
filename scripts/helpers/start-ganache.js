const Ganache = require('ganache-core')
const dotenv = require("dotenv")

dotenv.config()
const PORT = process.env.GANACHE_PORT || 8545
const mnemonic = process.env.MNEMONIC || 'logic cradle area quality lumber pitch radar sense dove fault capital observe'

const startGanache = () => {
  return new Promise((resolve, reject) => {
    var server = Ganache.server({
      mnemonic,
      total_accounts: 10,
      default_balance_ether: 100,
      network_id: 999,
      seed: 123,
      blocktime: 0
    })
    server.listen(PORT, err => {
      if (err) {
        return reject(err)
      }
      console.log(`Ganache listening on port ${PORT}`)
      resolve()
    })
  })
}

module.exports = startGanache