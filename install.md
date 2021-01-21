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

### git, tmux

use tmux to run the following sections separately

```
sudo apt-get install tmux git
git clone https://github.com/jackbow/lil-hash.git
cd lil-hash
tmux
```

### backend
```
sudo apt-get install redis
curl https://pyenv.run | bash # make sure to follow instructions at the end
LATEST=$(pyenv install --list | grep "3\." | grep -v - | grep -v b | tail -1)
pyenv install $LATEST
pyenv global $LATEST
cd app/backend
python -m pip install -r requirements.txt
sanic server.app
```

### frontend
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
nvm install 14
cd app/frontend
npm i; npm run build
```

### caddy
```
sudo apt-get install caddy
CADDY_VERSION=$(ls ~/.local/opt/ | grep caddy)
sudo setcap cap_net_bind_service=+ep ~/.local/opt/$CADDY_VERSION/bin/caddy
caddy run
```