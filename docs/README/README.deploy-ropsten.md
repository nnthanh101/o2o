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
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash &&
export NVM_DIR="$HOME/.nvm" &&
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" &&

nvm install 9.11.1 &&
nvm use 9.11.1 &&

export ROPSTEN_MNEMONIC="logic cradle area quality lumber pitch radar sense dove fault capital observe" &&
export IPFS_API_PORT=5001 &&
export INFURA_ACCESS_TOKEN=k89Iwbyul2K52Za7qh9w &&
cd contracts && ../node_modules/.bin/truffle.cmd deploy --network ropsten
```
