const Ganache = require('ganache-core')

const PORT = 8545

const startGanache = () => {
  return new Promise((resolve, reject) => {
    var server = Ganache.server({
      total_accounts: 10,
      default_balance_ether: 100,
      network_id: 999,
      seed: 123,
      blocktime: 0,
      mnemonic: 'logic cradle area quality lumber pitch radar sense dove fault capital observe'
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