## Linux installation instructions

### create 2GB swap file

Only run if this is a new server with a tiny amount of RAM.

```
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo echo "/swapfile swap swap defaults 0 0" >> /etc/fstab
sudo echo "vm.swappiness=20" >> /etc/sysctl.conf
```

### git, tmux, redis

Use tmux to run the following sections separately.

```
sudo apt-get install -y tmux git redis
git clone https://github.com/jackbow/lil-hash.git
cd lil-hash
tmux
```

### backend
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
nvm install 14
cd app
# copy env_sample to .env and modify values!
npm i
npm run serve | grep -v FST_ERR_PROMISE_NOT_FULFILLED > log
# dev: npm i -g pino-pretty; npm run serve | pino-pretty > log
```

### frontend
```
cd app/frontend
npm i; npm run build
```

### caddy
```
curl -sS https://webinstall.dev/caddy | bash
CADDY_VERSION=$(ls ~/.local/opt/ | grep caddy)
sudo setcap cap_net_bind_service=+ep ~/.local/opt/$CADDY_VERSION/bin/caddy
caddy run
```
