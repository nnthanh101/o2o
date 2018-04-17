const spawn = require("cross-spawn")
const path = require("path")

// Support functions
const delay = time => new Promise(resolve => setTimeout(resolve, time))
const iSpawn = (cmd, args) => spawn(cmd, args, { stdio: "inherit" })

// Const
const mnemonic = process.env.MNEMONIC || "guide box joke increase brown kick avoid toe wedding sure swift seek"
const ganacheCli = path.resolve(__dirname, "..", "node_modules", "ganache-cli", "build", "cli.node.js")

const runDevServer = () => {
  const testrpc = spawn("node", [ganacheCli, "-p=8545", `-m=${mnemonic}`])

  testrpc.stdout.on("data", data => {
    const msg = data.toString()
    // console.log(`[INFO] ${msg}`)
    console.log(msg)

    const isCompleted = msg.includes("Listening on")
    if (isCompleted) {
      iSpawn("npm", ["run", "migrate:development"])
    }
  })

  testrpc.stderr.on("data", data => console.log(`stderr: ${data}`))
}

runDevServer()
