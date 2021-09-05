FROM node:16-slim
# backend npm
WORKDIR /backend
COPY ./backend/package*.json ./
RUN npm install --production
# frontend
WORKDIR /frontend
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend .
RUN npm rebuild esbuild
RUN npm run build
WORKDIR /backend
COPY ./backend .
CMD [ "npm", "run", "serve" ]