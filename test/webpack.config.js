const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const [, config] = require("../webpack.config")
const { EnvironmentPlugin, NamedModulesPlugin } = require("webpack")
const Dotenv = require('dotenv-webpack')
const request = require("sync-request")

// Inject Server Public IP
const res = request("GET", "http://ipinfo.io/ip");
const publicIp = res.getBody("utf8").trim();
process.env.PUBLIC_IP = publicIp;

delete config.output

Object.assign(config, {
  devServer: {
    stats: "errors-only",
    host: "0.0.0.0",
    port: 8081,
    overlay: {
      errors: false,
      warnings: false
    }
  },

  entry: ["babel-polyfill", path.join(__dirname, "index.js")],

  plugins: [
    new Dotenv({
      systemvars: true
    }),
    new NamedModulesPlugin(),
    // new EnvironmentPlugin({
    //   IPFS_DOMAIN: "",
    //   IPFS_API_PORT: "",
    //   IPFS_GATEWAY_PORT: "",
    //   IPFS_GATEWAY_PROTOCOL: ""
    // }),
    new HtmlWebpackPlugin({ title: "Tests" })
  ]
})

module.exports = config
