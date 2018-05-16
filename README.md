# Blockchain Smart Contract & IPFS - Boilerplate
This helpful Boilerplates that allow you to focus on what makes your DApp unique; includes Solidity Smart Contracts &amp; Libraries, Front-end Views and more.

[![NPM Package](https://img.shields.io/npm/v/o2oprotocol.svg?style=flat-square)](https://www.npmjs.com/package/o2oprotocol)
[![Build Status](https://img.shields.io/travis/o2oprotocol/o2oprotocol.svg?branch=master&style=flat-square)](https://travis-ci.org/o2oprotocol/o2oprotocol)

# Demo
| App                                           | Ganache Port | UI Port |
|-----------------------------------------------|--------------|---------|
| [Digital Identity](http://52.197.90.86:3333 ) | 8545         | 3333    |
| [Flight Delay](http://52.197.90.86:3332)      | 8546         | 3332    |
| [Dapp](http://52.197.90.86:3331)              | 8547         | 3331    |
|                                               |              |         |

## 1. Roadmap

### 1.1. Truffle Developer
- [x] O2OProtocol Initial - `User Registry` Smart Contract
- [x] Development & Deployment Environment: local,ropsten,rinkeby,mainnet
- [x] Standard [EIP-20: ERC-20 Token Standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md). TODO: [ERC-233](https://github.com/ethereum/EIPs/issues/223)
- [x] Coding best practices: safeMath
- [x] Design Pattern: `Owned`, `Controller`, `Access Controll`, `Database`, `Ledger`, `Oraclize`
- [x] Design Pattern: `New Policy`, `Underwrite`, `Payout`
- [x] Design Pattern `Sharing Economy`: `Listing`, `Purchase` 
- [x] IPFS
- [ ] [Web3](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethestimategas) and [JSON RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_estimategas)
- [ ] O2O High-Level Architecture
- [x] The ABI definition of the Smart Contract: "public" via etherscan + "private" via frontend.
- [ ] Testing using [Ganache (TestRPC)](https://github.com/trufflesuite/ganache-cli)
- [ ] servives/src/index.js --> o2oprotocol.js: listings, contractService, userRegistryService, ipfsService.


## 1.2. Lazy Developer
- [ ] Private Blockchains “Consortium Blockchains” using [Geth](https://www.ethereum.org/cli) to setup a “private” or “testnet” Ethereum blockchain. Note: Geth is suitable for building frontends for DApps --> Genesis block, Indentity, DataDir --> Externally Owned Accounts `EOA` & `Contract Accounts`
[TODO](https://coin5s.com/content/deploying-dapp-ethereum%E2%80%99s-test-blockchain)
- [ ] Develop eConomySharing: `Listing.sol`
- [ ] Financial atomic processes & standards: payments, assets, data, identity, KYC, governance


## 1.3. Happy User

## 2. Directory Structure

```
  contracts
  ├── contracts                                           <- Solidity contracts 
  ├── migrations                                            <- Deployment Script
  ├── test                                                  <- Test contracts
  ├── truffle-config.js                                     <- Truffle config
  src                                                     <- O2O Service
  ├── ipfs-service                                          <- IPFS service
  ├── contract-service                                      <- Contract service
  ├── test                                                  <- Test services
  README.md
```

## 3. Tests

Browser tests are automatically served at `http://localhost:8081` when you run `npm start`.

Tests are automatically rerun when source or test code is changed.

Run a subset of tests using the `grep` query string parameter, for example: http://localhost:8081/?grep=IpfsService

We also have contract unit tests that are not run in the browser. These can be run with `npm run test:contracts` (you should *not* have the server running at this time, as these tests start their own local blockchain instance).

## O2OProtocol JS Documentation

### Introduction

Welcome to the o2oprotocol.js documentation! o2oprotocol.js is a Javascript library for interacting with the O2O Protocol.
Using the library you can create new listings from your applications, purchase them, or update them from your own off-chain applications. 

More information can be found at [O2OProtocol Platform Readme](README.md) 

### Warning
This is still an alpha version which will evolve significantly before the main net release.

### Data Sharing

> Sellers:

 - Create Listings
 - Update Listings
 - Delete Listings
 - Validate Listings

> Buyers:
 
 - Browse Listing
 - Create Bookings
 - Update Bookings
 - Cancel Bookings

  Note: to show the gas costs of each transaction during a test, set the enviroment variable GAS_TRACKING before launching truffle develop. For example, using bash: GAS_TRACKING=1 npx truffle develop


## Install 

### NPM
```
npm install o2oprotocol --save
```

### Yarn
```
yarn add o2oprotocol
```

### Local
For developing on `o2oprotocol.js`, it is better to link the package rather than installing it. (Otherwise you would need to run `npm build` everytime you made a change to the package.)

Install:dev (shortcut for npm install && npm link). Linking makes this available as a local npm package for local dapp development
```
npm run install:dev
```

## Import 
```
import O2OProtocol from 'o2oprotocol'
const configOptions = {}
const { contractService, ipfsService, originService } = new O2OProtocol(configOptions)
```
## Configuration Options
Config options are passed into the O2OProtocol constructor at instantiation

```
const configOptions = {
  option: 'value'
}
const origin = new O2OProtocol(configOptions)
```

 Valid options:
 - `ipfsDomain`
 - `ipfsApiPort`
 - `ipfsGatewayPort`
 - `ipfsGatewayProtocol`
 - `attestationServerUrl`

## IPFS

 If you are running a local IPFS daemon then set the following config options ([see config options](#configuration-options)):

```
{
 ipfsDomain: '127.0.0.1',
 ipfsApiPort: '5001',
 ipfsGatewayPort: '8081',
 ipfsGatewayProtocol: 'http'
}
```

Configure your local IPFS daemon with the following settings to avoid CORS errors:

```
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["localhost:*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST", "PUT"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
```

## Troubleshooting

### Python 3

If you have Python 3 installed, you may see this error when installing dependencies:

```
gyp ERR! stack Error: Python executable "/Users/aiham/.pyenv/shims/python" is v3.6.4, which is not supported by gyp.
```

Resolve this by configuring npm to use Python 2 (where python2.7 is a binary accessible from your $PATH):

```
npm config set python python2.7
```

## Tests

When you begin developing, run `npm test` and keep it running while you develop.

View test results in your browser (with MetaMask installed and setup) at http://localhost:8081

Tests are automatically rerun when source or test code is changed.

Run a subset of tests using the `grep` query string parameter, for example: http://localhost:8081/?grep=IpfsService

## Discussion
### Smart Contract Audit
- [x] Unit tests passing, checking tests configuration (matching the configuration of main network);
- [x] Compilator warnings;
- [x] Race Conditions. Reentrancy. Cross-function Race Conditions. Pitfalls in Race Condition solutions;
- [ ] Possible delays in data delivery;
- [x] Transaction-Ordering Dependence (front running);
- [ ] Timestamp Dependence;
- [x] Integer Overflow and Underflow;
- [ ] DoS with (unexpected) Revert;
- [ ] DoS with Block Gas Limit;
- [ ] Call Depth Attack. Not relevant in modern ethereum network :)
- [ ] Methods execution permissions;
- [ ] Oracles calls;
- [ ] Economy model. It’s important to forecast scenarios when user is provided with additional economic motivation or faced with limitations. If application logic is based on incorrect economy model, the application would not function correctly and participants would incur financial losses. This type of issue is most often found in bonus rewards systems.
- [ ] The impact of the exchange rate on the logic;
- [ ] Private user data leaks. Needed

### O2OProtocol Services
- `package.json`
    - "form-data": "^2.3.2",
    - "ipfs-api": "^14.3.7",

- actual gas cost by running web3.eth.getTransactionReceipt(txId)

- Store IPFS and contract data separately

-  [the upcoming version of web3](https://web3js.readthedocs.io/en/1.0/) will work with truffle

- Return custom objects instead of raw web3 transactions from API

- Move logic out of `Listing` contract

- Discussion around how to do smart contract migrations

- Listings expire 60 days after creation.

-  there are six events that affect transaction state, each caused by the action of a sole party, and two of them (5 & 6) being potentionally out of sequence:

Create listing (seller)
Buy listing (buyer) - presumed to be the equivalent of sending money
Fulfill order (seller)
Receive order (buyer)
Withdraw funds (seller)
Provide feedback (buyer)

- Data verification for JSON schema listings