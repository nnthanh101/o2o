# Dev Server

## Setup
Dev server run `private chain` & `ipfs daemon`
+ Private chain: default start on port 8545
+ Update ipfs config:

```bash
# Update IPFS config as we need through env
#export IPFS_ADDRES_API=[YOUR API PORT]
#export IPFS_ADDRES_GATEWAY=[YOUR GATEWAY PORT]
export IPFS_ADDRES_API=5001
export IPFS_ADDRES_GATEWAY=8088
```

Run with pm2

```$xslt
pm2 start pm2-o2o.json
```
