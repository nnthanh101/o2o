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
cd contracts && npx truffle deploy
```