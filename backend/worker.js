import { Router } from 'itty-router'
import random_phrase from './random-phrase/random-phrase.js';

// config
const N_TRIES = 5; // number of tries to find a free key before increasing key length
const EXPIRATION_IN_HOURS = 24;
const EXPIRATION_IN_SECONDS = EXPIRATION_IN_HOURS * 60 * 60; // * 60; // time till link expires

// Instantiate router
const router = Router()

router.get('/', async (request) => {

})

// Get redirect
router.get('/:key', async ({ params }) => {
  const url = await KV.get(params.key)
  if (url) return Response.redirect((url.includes('://') ? url : 'http://' + url))
  else return new Response(404)
})

// Post URL
router.post('/hash', async ({ query }) => {
  let nth_try = 0
  let key = random_phrase(Math.floor(nth_try++ / N_TRIES));
  while ((await KV.get(key)) !== null) {
    key = random_phrase(Math.floor(nth_try++ / N_TRIES));
  }
  await KV.put(key, query.url, { expirationTtl: EXPIRATION_IN_SECONDS });
  return new Response(JSON.stringify({ key, hours: EXPIRATION_IN_HOURS }))
})

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))

addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)