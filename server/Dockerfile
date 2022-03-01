FROM node:10-alpine
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i --silent

COPY server.js ./

ENTRYPOINT node server.js
