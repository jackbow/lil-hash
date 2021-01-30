# [lil' hash](lilhash.com)
A simple shareable URL shortener (a la [hamhash.com](hamhash.com)).
![screenshot](https://i.imgur.com/gBwgUKS.png)

## Tech
- [Svelte](https://svelte.dev/) -- frontend
- [Tailwindcss](https://tailwindcss.com/) -- styling
- [Vite](https://vitejs.dev/) -- frontend tooling (through [svite](https://github.com/dominikg/svite))
- [Fastify](https://fastify.io/) -- backend

## Installation
See install.md

### Usage

#### POST /hash?url={encoded url}

Associates a word with a url. Response comes in the following format.

```javascript
{
  "key": key,
  "hours": hours_til_expiration
}
```

#### GET /\<key\>

Redirects to the mapped URL if in the database, otherwise returns a 404 error.
