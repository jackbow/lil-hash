# [lil' hash](lilhash.com)
A simple shareable URL shortener (a la [hamhash.com](hamhash.com)).
![screenshot](https://i.imgur.com/gBwgUKS.png)

## Hosting
1. Edit env file & line 2 of frontend/src/App.svelte
2. `source env && docker-compose up -d`

## To do
- [ ] Route on hash so back button works as expected.

## Tech
- [Svelte](https://svelte.dev/) — frontend
- [Tailwindcss](https://tailwindcss.com/) — styling
- [Vite](https://vitejs.dev/) — frontend tooling
- [Fastify](https://fastify.io/) — backend
