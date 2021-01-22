HASH=`git rev-parse HEAD`
git pull

if [[ $HASH != `git rev-parse HEAD` ]]
then
  tmux kill-server
  tmux \
    new-session  "cd app/frontend; npm i; npm build; read" \; \
    split-window "cd app; pip install -r requirements.txt; sanic server.app; read" \; \
    split-window "caddy run; read" \; \
    select-layout even-vertical
fi

# crontab -e
# remember to chmod +x ./autopull.sh
# 0 0 * * * ~/lil-hash/autopull.sh