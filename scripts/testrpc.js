const TestRPC = require("ethereumjs-testrpc")

const options = {
  port: 8545,
  accounts: [
    // 0 - Test Account    0x70b25e8F5e24488731be4595aA59d20b801AD08C
    {
      secretKey: "0xdd2baab034c7fcd390bfa76371f15e60475295c31e7f5fda0e8a4dd81aaf3111",
      balance: 110000000000000000000
    },
    // 1 - Test Account    0xecCF15CACcE5274481928Bf244736b1cec45d142
    {
      secretKey: "0x41aa7ac0cc200ce8c4b644ffa8a4909f054bc0b841b92b06243c51351200ac40",
      balance: 10000000000000000000
    }
  ],
  debug: false,
  logger: {
    log: console.log
  },
  blocktime: 0
}

const getAccountInfo = (blockchain, address, index) => {
  const isUnlocked = blockchain.isUnlocked(address)
  const unlockIcon = isUnlocked ? " 🔒" : ""
  const privateKey = blockchain.accounts[address].secretKey.toString("hex")
  return `(${index}) ${address}${unlockIcon}, pKey: ${privateKey}`
}

TestRPC.server(options).listen(options.port, (err, state) => {
  if (err) {
    console.log("[ERR]", err.message, err.stack)
    console.log(err)
    return
  }

  // We start TestRPC
  console.log("EthereumJS TestRPC")
  console.log("Accounts:")

  // Info all acounts we have
  Object.keys(state.accounts).forEach((address, index) => console.log(getAccountInfo(state, address, index)))

  // Confirm which port used
  const hostname = options.hostname || "localhost"
  const port = options.port
  console.log(`Listening on ${hostname}:${port}`)
})
