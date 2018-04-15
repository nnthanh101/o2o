const spawn = require("cross-spawn")

const delay = time => new Promise(resolve => setTimeout(resolve, time))
const iSpawn = (cmd, args) => spawn(cmd, args, { stdio: "inherit" })

const runDevServer = () => {
  iSpawn("npm", ["run", "chain:private"])
  delay(1500).then(iSpawn.bind(this, "npm", ["run", "migrate:development"]))
}

runDevServer()
