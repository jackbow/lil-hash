# url-hash

## Backend

CD into `app/backend`, run `install.sh`, [install redis](https://redis.io/download) [install caddysever](https://caddyserver.com/docs/install). Next run `redis-server ./redis.conf`, `sanic server.app`, `caddy reverse-proxy --from example.com --to localhost:8000` in separate terminals, replacing example.com with your url.

## API

#### /hash/\<hours\>/\<encoded url\>

Associates a word with a url for the given number of hours. Response comes in the following format.

```javascript
{
  "key": key,
  "duration_hours": duration_hours
}
```

#### /\<key\>

Redirects to the mapped URL if in the database, otherwise returns a 404 error.