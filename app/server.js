// others
import 'make-promises-safe';
import path from 'path';
import Redis from 'ioredis';
import dotenv from 'dotenv';
// fastify
import fastify from 'fastify';
import helmet from 'fastify-helmet';
import compress from 'fastify-compress';
import rate_limit from 'fastify-rate-limit';
import cors from 'fastify-cors';
import serve_static from 'fastify-static';
// local
import random_phrase from './random-phrase/random-phrase.js';
dotenv.config();

const N_TRIES = 5; // number of tries to find a free key before increasing key length
const EXPIRATION_IN_HOURS = 24;
const EXPIRATION_IN_SECONDS = EXPIRATION_IN_HOURS * 60 * 60; // * 60; // time till link expires
const STATIC_ROOT_REGEX = /^.+\.(ico|svg|png)$/; // regex for files in static root (./dist)

const redis = new Redis();
const app = fastify({
  logger: true,
});

if (process.env.FASTIFY_ENV === 'dev') {
  app.register(cors, {
    origin: (origin, cb) => {
      cb(null, true);
      return;
    },
  });
}

app.register(rate_limit, { max: 20, timeWindow: '1 minute' });
app.register(helmet);
app.register(compress);
app.register(serve_static, { root: path.join(path.resolve(), 'frontend', 'dist') });

app.get('/', async (req, res) => {
  res.sendFile('index.html');
});

app.get('/_assets/:file', async (req, res) => {
  res.sendFile(`_assets/${req.params.file}`);
});

app.get('/:key', async (req, res) => {
  if (STATIC_ROOT_REGEX.test(req.params.key)) {
    res.sendFile(req.params.key); // serve static root
  } else if (req.params.key === 'log' && 'password' in req.query && req.query.password === process.env.FASTIFY_LOG_PW) {
    res.sendFile('log', path.join(path.resolve()));
  } else {
    const url = await redis.get(req.params.key);
    if (url) res.redirect(url.includes('://') ? url : 'http://' + url);
    else res.code(404).send('sorry, link expired');
  }
});

app.post('/hash', { schema: { querystring: { url: { type: 'string' } } } }, async (req, res) => {
  let key = null;
  let freeKeyFound = false;
  for (let i = N_TRIES; !freeKeyFound; ++i) {
    key = random_phrase(Math.floor(i / N_TRIES));
    freeKeyFound = (await redis.get(key)) === null;
  }
  redis.set(key, req.query.url, 'EX', EXPIRATION_IN_SECONDS);
  res.send({ key, hours: EXPIRATION_IN_HOURS });
});

const start = async () => {
  try {
    await app.listen(8000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
