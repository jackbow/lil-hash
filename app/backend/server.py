from sanic import Sanic
from sanic.response import json, redirect, empty
from sanic_cors import CORS, cross_origin
from urllib.parse import unquote
from wordlist import words
import random
import redis

app = Sanic("lil' hash")
if app.config.ENV == "dev":
    cors = CORS(app, resources={r"/*": {"origins": "http://localhost:*"}})
rdb = redis.Redis(host='localhost', port=6379, db=0)

@app.get("/<key:string>")
async def unhashurl(request, key: str):
    if rdb.get(key) is not None:
        url = rdb.get(key).decode()
        if url.find("://") == -1:
            url = "http://" + url
        return redirect(url)
    else:
        return empty(status=404)

@app.post("/hash")
async def hashurl(request):
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
