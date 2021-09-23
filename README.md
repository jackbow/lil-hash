# [lil' hash](lilhash.com)
An simple URL shortener that produces shortened URLS that are easily rememberable and speakable.
<br>
Inspired by [hamhash.com](https://hamhash.com) (RIP 🥀🪦).
![screenshot](https://i.imgur.com/gBwgUKS.png)

## Hosting
#### Fly.io
1. [Install flyctl](https://fly.io/docs/getting-started/installing-flyctl/)
2. Create a [free redis instance](https://app.redislabs.com/).
3. `flyctl apps create`
4. `flyctl secrets set FASTIFY_REDIS_URL="redis://..."`
5. `flyctl deploy && flyctl open`
#### Docker Compose
1. Edit env file
2. `source env && docker-compose up -d`

## To do
- [ ] Route on hash so back button works as expected.

## Tech
- [Svelte](https://svelte.dev/) — frontend
- [Tailwindcss](https://tailwindcss.com/) — styling
- [Vite](https://vitejs.dev/) — frontend tooling
- [Fastify](https://fastify.io/) — backend
