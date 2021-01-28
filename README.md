# [lil' hash](lilhash.com)
A simple shareable URL shortener (a la [hamhash.com](hamhash.com)).
![screenshot](https://i.imgur.com/gBwgUKS.png)

## Tech
- [Svelte](https://svelte.dev/) -- frontend
- [Tailwindcss](https://tailwindcss.com/) -- styling
- [Vite](https://vitejs.dev/) -- frontend tooling
- [Sanic](https://sanicframework.org/) -- backend

## Installation
See install.md

### API

#### POST /hash?url={encoded url}&hours={hours}

Associates a word with a url for the given number of hours. Response comes in the following format.

```javascript
{
  "key": key,
  "duration_hours": duration_hours
}
```

#### GET /\<key\>

Redirects to the mapped URL if in the database, otherwise returns a 404 error.
