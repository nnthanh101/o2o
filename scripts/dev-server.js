const spawn = require("cross-spawn")
const path = require("path")

// Support functions
const delay = time => new Promise(resolve => setTimeout(resolve, time))
const iSpawn = (cmd, args) => spawn(cmd, args, { stdio: "inherit" })

// Const
const mnemonic = process.env.MNEMONIC || "guide box joke increase brown kick avoid toe wedding sure swift seek"
const ganacheCli = path.resolve(__dirname, "..", "node_modules", "ganache-cli", "build", "cli.node.js")

const runDevServer = () => {
  iSpawn("node", [ganacheCli, "-p=8545", `-m=${mnemonic}`])
  delay(1500).then(iSpawn.bind(this, "npm", ["run", "migrate:development"]))
}

runDevServer()
