# Blockchain Smart Contract & IPFS - Boilerplate
This helpful Boilerplates that allow you to focus on what makes your DApp unique; includes Solidity Smart Contracts &amp; Libraries, Front-end Views and more.

[![NPM Package](https://img.shields.io/npm/v/o2oprotocol.svg?style=flat-square)](https://www.npmjs.com/package/o2oprotocol)
[![Build Status](https://img.shields.io/travis/o2oprotocol/o2oprotocol.svg?branch=master&style=flat-square)](https://travis-ci.org/o2oprotocol/o2oprotocol)


## 1. Roadmap
- [x] O2OProtocol Initial - `User Registry` Smart Contract
- [x] Development & Deployment Environment: local,ropsten,rinkeby,mainnet
- [x] [EIP-20: ERC-20 Token Standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
- [ ] `owned` pattern
- [ ] Controller, Access Controll, Database, Ledger
- [ ] New Policy, Underwrite, Payout for Insurance
- [ ] Oraclize
- [ ] secured by IPFS content hash

## 2. O2OProtocol Initial

![Ethereum DApp Ecosystem](public/images/ethereum.jpg)

### Smart Contract Packages:
npm install --save truffle web3 dotenv uport-connect ipfs-api truffle-hdwallet-provider
npm install --save-dev ganache-cli solium solidity-coverage

### Frontend Packages:
npm install --save react react-dom redux react-redux react-router redux-thunk
npm install --save-dev

@TODO
`npx` explain: https://goo.gl/gsgYNR
make sure `npm` version >= 5.2.0


### Directory Structure

```
/
├── contracts                                           <- Directory for Solidity contracts 
│   ├── Migrations.sol
│   └── UserRegistry.sol
├── migrations                                          <- Directory for scriptable deployment files 
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js
├── test                                                <- Directory for test files for testing your application and contracts
│   └── TestUserRegistry.js
├── truffle-config.js                                   <- Truffle configuration file
```

## 3. Testing

### Test on Local blockchain

In terminal
```
npx truffle develop
```
and then at prompt type:
```
test
```

To show the gas costs of each transaction during a test, set the enviroment variable `GAS_TRACKING` before launching `truffle develop`. For example, using bash: `GAS_TRACKING=1 npx truffle develop`.

### Rinkeby, Ropsten, Main, and other blockchains
We deploy contracts through [Infura](https://infura.io/) to reduce time on `syncing` node with chain on local machine

Please provide follow key before run
```
INFURA_ACCESS_TOKEN
GAS_LIMIT
ROPSTEN_MNEMONIC or
RINKEBY_MNEMONIC or
MAINNET_MNEMONIC 
```

```
export ROPSTEN_MNEMONIC=[MNEMONIC] &&
export INFURA_ACCESS_TOKEN=[KEY]   &&
export GAS_LIMIT=[GAS]             &&
npx truffle test
```

## Troubleshooting

If you get the following error:

```
Error: Attempting to run transaction which calls a contract function, but recipient address 0x8cdaf0cd259887258bc23a92c0a6da92698644c0 is not a contract address
```

Resolve this by running all migrations again:

```sh
migrate --reset
```

## Publish

```sh
npm publish &&

```
