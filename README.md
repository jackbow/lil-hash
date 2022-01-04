# [lil' hash](lilhash.com)

A simple URL shortener that produces easily rememberable and speakable shortened URLs.
<br>
The links expire after 24 hours so there's almost always a one word shortening available.
<br>
Inspired by [hamhash.com](https://hamhash.com) (RIP 🥀🪦).
![screenshot](https://i.imgur.com/gBwgUKS.png)

## Hosting

1. Create a [Cloudflare Worker](https://workers.cloudflare.com/)
2. Make a `wrangler.toml` using the example file.
3. `npm run build && wrangler publish`

## To do

- [x] Route on hash so back button works as expected.
- [x] Fix dark mode.

## Tech

Globally deployed serverlessly with server-side rendering.

- [Svelte Kit](https://kit.svelte.dev/) — Frontend framework
- [Tailwindcss](https://tailwindcss.com/) — Styling
- [Cloudflare Workers](https://workers.cloudflare.com/) — Serverless hosting

## Design

- [Averia Serif](http://iotic.com/averia/)
- [Tabler Icons](https://tabler-icons.io/)
