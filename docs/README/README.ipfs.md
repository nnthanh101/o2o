# Demo
Push files under `files` folder

## Setup IPFS local
Install ipfs

```
sudo apt-get update
sudo apt-get install golang-go -y

wget https://dist.ipfs.io/go-ipfs/v0.4.10/go-ipfs_v0.4.10_linux-386.tar.gz
tar xvfz go-ipfs_v0.4.10_linux-386.tar.gz
sudo mv go-ipfs/ipfs /usr/local/bin/ipfs
```

## Run local
By default ipfs run on port 5001

```
ipfs init
ipfs daemon
```

Simple deploy files under `files` folder with node

```
npm run start
```

## Publish to ipfs.io
After success creating ipfs hash

Run follow cmd to publish on ipfs.io

+ Example:

```
~ $ ipfs name publish /ipfs/QmNwoE1vkQeEwY3dyDdK4uyaYpm2GYTUn68mqkf4kdvXcn
Published to QmRzYFGy9M5CyjEwNdh62udgBZV6BGbNZec8gMB9mXFhX6: /ipfs/QmNwoE1vkQeEwY3dyDdK4uyaYpm2GYTUn68mqkf4kdvXcn
~ $ ipfs name resolve QmRzYFGy9M5CyjEwNdh62udgBZV6BGbNZec8gMB9mXFhX6
/ipfs/QmNwoE1vkQeEwY3dyDdK4uyaYpm2GYTUn68mqkf4kdvXcn
```

Review online

```
https://infs.io/ipfs/QmNwoE1vkQeEwY3dyDdK4uyaYpm2GYTUn68mqkf4kdvXcn
```

## Tunning Config

Hanlde port conflict

```
ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001
ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/8080
```



