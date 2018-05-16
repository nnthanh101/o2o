// const { spawn } = require('child_process')
const spawn = require("cross-spawn")
const path = require("path")
const config = require("../../test/webpack.config")

// Serve webpack dev server for browser testing
const startTestServer = () => {
  const cmd = path.join(__dirname, "..", "..", "node_modules", ".bin", "webpack-dev-server")
  const serverCnf = config.devServer
  
  console.log("cmd", cmd)
  console.log(`Serving o2oprotocol.js tests from http://${serverCnf.host}:${serverCnf.port}`)
  
  const webpackDevServer = spawn(cmd, ['--hot', '--config', 'test/webpack.config.js'])
  webpackDevServer.stderr.pipe(process.stderr)
}

module.exports = startTestServer
