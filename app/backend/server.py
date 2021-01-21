from sanic import Sanic
from sanic.response import json, redirect, empty
from wordlist import words
import random
import redis

app = Sanic("url-hash")
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

@app.get("/hash/<duration_hours:int>/<url:string>")
async def hashurl(request, duration_hours: int, url: str):
    duration_hours = duration_hours if duration_hours < 24 else 24
    duration_hours = duration_hours * 60 * 60
    key = random.choice(words)
    i = 0
    while rdb.get(key) is not None:
        key = "".join([random.choice(words) for n in range(i)])
        i = i + 1
    rdb.set(key, url)
    rdb.expire(key, duration_hours)
    return json({"key": key, "duration_hours": duration_hours})
