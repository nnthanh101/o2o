const spawn = require('child_process').spawn
const Ganache = require('ganache-core')
const watch = require('node-watch')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

const args = process.argv.slice(2)
const shouldWatch = (args.length && args[0] === 'serve')

const startGanache = () => {
  return new Promise((resolve, reject) => {
    var server = Ganache.server({
      total_accounts: 10,
      default_balance_ether: 100,
      network_id: 999,
      seed: 123,
      blocktime: 0,
      mnemonic: 'analyst only canal defy worry forest frozen market flag fox divert minute'
    })
    server.listen(9545, err => {
      if (err) {
        return reject(err)
      }
      console.log('Ganache listening.')
      resolve()
    })
  })
}

const buildContracts = () => {
  return new Promise((resolve, reject) => {
    const truffleMigrate = spawn('../node_modules/.bin/truffle', ['compile'], { cwd: './contracts' })
    truffleMigrate.stdout.pipe(process.stdout)
    truffleMigrate.stderr.pipe(process.stderr)

    truffleMigrate.on('exit', code => {
      if (code !== 0) {
        return reject()
      }
      console.log('Truffle compile finished OK.')
      resolve()
    })
  })
}

const deployContracts = () => {
  return new Promise((resolve, reject) => {
    const truffleMigrate = spawn('../node_modules/.bin/truffle', ['migrate', '--reset', '--compile-all'], { cwd: './contracts' })
    truffleMigrate.stdout.pipe(process.stdout)
    truffleMigrate.stderr.pipe(process.stderr)

    truffleMigrate.on('exit', code => {
      if (code !== 0) {
        return reject()
      }
      console.log('Truffle migrate finished OK.')
      resolve()
    })
  })
}

// Serve webpack dev server for browser testing
const startTestServer = () => {
  console.log('Serving o2oprotocol.js tests from http://localhost:8081')
  const webpackDevServer = spawn('./node_modules/.bin/webpack-dev-server', ['--hot', '--config', 'test/webpack.config.js'])
  webpackDevServer.stderr.pipe(process.stderr)
}

async function start() {
  let compiler = webpack(webpackConfig)

  if (shouldWatch) {
    await startGanache()
    await deployContracts()

    // watch contracts
    watch('./contracts/contracts', { recursive: true }, (evt, name) => {
      console.log('%s changed.', name)
      deployContracts()
    })

    // watch js
    compiler.watch({}, (err, stats) => {
      if(err) {
        console.log(err)
      } else {
        console.log('webpack compiling')
      }
    })

    startTestServer()
  } else {
    await buildContracts()
    compiler.run((err, stats) => {
      if(err) {
        console.log(err)
      } else {
        console.log('webpack compiled successfully')
      }
    })
  }
}

start()
