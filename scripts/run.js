const startGanache = require('./helpers/start-ganache')
const deployContracts = require('./helpers/deploy-contracts')
const startIpfs = require('./helpers/start-ipfs')

const start = async () => {
    await startGanache()
    await startIpfs()
    await deployContracts()
}

start()
