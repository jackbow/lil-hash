HASH=`git rev-parse HEAD`
git pull

if [[ $HASH != `git rev-parse HEAD` ]]
then
  tmux kill-server
  tmux \
    new-session  "cd frontend; npm i; npm build; read" \; \
    split-window "pip install -r requirements.txt; sanic server.app read" \; \
    split-window "caddy run; read" \; \
    select-layout even-vertical
fi

# crontab
# remember to chmod +x ./autopull.sh
# 0 0 * * * ~/lil-hash/autopull.sh