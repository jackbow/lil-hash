# frontend
FROM node:16-slim AS frontend-build
WORKDIR /frontend
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend .
RUN npm rebuild esbuild
RUN npm run build

# backend
FROM node:16-slim
WORKDIR /backend
COPY ./backend/package*.json ./
RUN npm install --production
COPY ./backend .
COPY --from=frontend-build /frontend/dist/ /frontend/dist/
CMD [ "npm", "run", "serve" ]