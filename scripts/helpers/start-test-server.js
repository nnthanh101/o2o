// const { spawn } = require('child_process')
const spawn = require("cross-spawn")
const path = require("path")

// Serve webpack dev server for browser testing
const startTestServer = () => {
  const cmd = path.join(__dirname, "..", "..", "node_modules", ".bin", "truffle")
  console.log("cmd", cmd)
  
  console.log(`Serving o2oprotocol.js tests from http://${process.env.PUBLIC_IP}:8081`)
  const webpackDevServer = spawn(cmd, ['--hot', '--config', 'test/webpack.config.js'])
  webpackDevServer.stderr.pipe(process.stderr)
}

module.exports = startTestServer
