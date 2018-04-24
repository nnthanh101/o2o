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
      balance: 110000000000000000000
    }
  ],
  debug: false,
  logger: console,
  blocktime: 0,
  gasLimit: 6721975,
  gasPrice: 100000000000
}

const getAccountInfo = (chainState, address, index) => {
  const isUnlocked = chainState.isUnlocked(address)
  const unlockIcon = isUnlocked ? " 🔒" : ""
  const privateKey = chainState.accounts[address].secretKey.toString("hex")
  return `(${index}) ${address}${unlockIcon}, pKey: ${privateKey}`
}

TestRPC.server(options).listen(options.port, (err, chainState) => {
  if (err) {
    console.log("[ERR]", err.message, err.stack)
    console.log(err)
    return
  }

  // We start TestRPC
  console.log("EthereumJS TestRPC")
  console.log("Accounts:")

  // Info all acounts we have
  Object.keys(chainState.accounts).forEach((address, index) => console.log(getAccountInfo(chainState, address, index)))

  // Confirm which port used
  const hostname = options.hostname || "localhost"
  const port = options.port
  console.log(`Listening on ${hostname}:${port}`)
})
