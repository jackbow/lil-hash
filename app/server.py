from sanic import Sanic
from sanic.response import json, redirect, empty, file
from sanic_cors import CORS, cross_origin
from sanic_brotli import Compress
from urllib.parse import unquote
from wordlist import words
import random
import redis
from os import listdir

app = Sanic("lil' hash")
app.config['COMPRESS_LEVEL'] = 11
app.config['COMPRESS_MIN_SIZE'] = 400
Compress(app)

rdb = redis.Redis(host='localhost', port=6379, db=0)

if hasattr(app.config, 'ENV') and app.config.ENV == "dev":
    cors = CORS(app, resources={r"/*": {"origins": "*"}})

# static routing
app.static("/", "./frontend/dist/index.html")
for file_name in listdir("frontend/dist"):
    file_ext = file_name.split(".").pop()
    if file_ext == "svg" or file_ext == "png" or file_ext == "ico":
        app.static("/" + file_name, "frontend/dist/" + file_name)
for file_name in listdir("frontend/dist/_assets"):
    app.static("/_assets/" + file_name, "frontend/dist/_assets/" + file_name)


@app.get("/<key:string>")
async def unhash_url(request, key: str):
    if rdb.get(key) is not None:
        url = rdb.get(key).decode()
        if url.find("://") == -1:
            url = "http://" + url
        return redirect(url)
    else:
        return empty(status=404)

@app.post("/hash")
async def hash_url(request):
    url = unquote(request.args.get("url"))
    hours = int(request.args.get("hours"))
    hours = hours if hours <= 24 else 24
    key = random.choice(words)
    i = 0
    while rdb.get(key) is not None:
        key = "".join([random.choice(words) for n in range(i)])
        i = i + 1
    rdb.set(key, url)
    rdb.expire(key, hours * 60 * 60)
    return json({"key": key, "hours": hours})
