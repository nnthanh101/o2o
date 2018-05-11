# Demo
Push files under `files` folder

## 1. Setup IPFS local
Install ipfs

```
sudo apt-get update                                                         &&
sudo apt-get install golang-go -y                                           &&

wget https://dist.ipfs.io/go-ipfs/v0.4.10/go-ipfs_v0.4.10_linux-386.tar.gz  &&
tar xvfz go-ipfs_v0.4.10_linux-386.tar.gz                                   &&
sudo mv go-ipfs/ipfs /usr/local/bin/ipfs
```

## 2. PM2

> Run under pm2

```
  cd docs/README                     &&
  pm2 start ipfs.sh --no-autorestart &&
  pm2 save                           &&
  pm2 startup
```

## 3. Swarm

- $ `ipfs id` 

"Addresses": [
		"/ip4/127.0.0.1/tcp/4001/ipfs/QmQtjEGuhPnLZUnsTRh3wyi6s9YAZ1sZHgonCnNmcGBc9A",
		"/ip4/172.26.5.96/tcp/4001/ipfs/QmQtjEGuhPnLZUnsTRh3wyi6s9YAZ1sZHgonCnNmcGBc9A",
		"/ip6/::1/tcp/4001/ipfs/QmQtjEGuhPnLZUnsTRh3wyi6s9YAZ1sZHgonCnNmcGBc9A",
		"/ip4/52.197.90.86/tcp/4001/ipfs/QmQtjEGuhPnLZUnsTRh3wyi6s9YAZ1sZHgonCnNmcGBc9A"
	]

"Addresses": [
		"/ip4/127.0.0.1/tcp/4001/ipfs/QmaQwA2QsA3J7g99gqezLiPgKPdFjcUJE5MVUNV4HY92Vd",
		"/ip4/172.26.10.109/tcp/4001/ipfs/QmaQwA2QsA3J7g99gqezLiPgKPdFjcUJE5MVUNV4HY92Vd",
		"/ip6/::1/tcp/4001/ipfs/QmaQwA2QsA3J7g99gqezLiPgKPdFjcUJE5MVUNV4HY92Vd",
		"/ip4/54.178.223.121/tcp/4001/ipfs/QmaQwA2QsA3J7g99gqezLiPgKPdFjcUJE5MVUNV4HY92Vd"
	],
  
- $ `ipfs swarm connect /ip4/52.197.90.86/tcp/4001/ipfs/QmQtjEGuhPnLZUnsTRh3wyi6s9YAZ1sZHgonCnNmcGBc9A`  


## 4. Run Daemon
By default ipfs run on port 5001

```
ipfs init                                           &&
ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001     &&
ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/8081 &&
ipfs daemon
```

## 4. TODO

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



