# Dev Server

## Setup
Dev server run `private chain` & `ipfs daemon`

### Install dependencies

+ Install node dependencies

```
npm install
```

Install IPFS

```
sudo apt-get update
sudo apt-get install golang-go -y

wget https://dist.ipfs.io/go-ipfs/v0.4.10/go-ipfs_v0.4.10_linux-386.tar.gz
tar xvfz go-ipfs_v0.4.10_linux-386.tar.gz
sudo mv go-ipfs/ipfs /usr/local/bin/ipfs
```

### Config ipfs

+ Private chain: default start on port 8545

```bash
# Mnemonic to setup default account
# Default mnemonic value
guide box joke increase brown kick avoid toe wedding sure swift seek
# Setup in environment
export MNEMONIC=[YOUR MNEMONIC]
```

+ Update ipfs config:

```bash
# Update IPFS config as we need through env
#export IPFS_ADDRES_API=[YOUR API PORT]
#export IPFS_ADDRES_GATEWAY=[YOUR GATEWAY PORT]
export IPFS_ADDRES_API=5001
export IPFS_ADDRES_GATEWAY=8088
```

### Run with pm2

```bash
pm2 start pm2-o2o.json
```

### Allow ports
Port for IPFS

```bash
# IPFS_ADDRES_API && IPFS_ADDRES_GATEWAY
sudo ufw allow 5001
sudo ufw allow 8088
```

Port for private chain

```bash
sudo ufw allow 8545
```
