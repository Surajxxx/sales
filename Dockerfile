# syntax=docker/dockerfile:1
FROM node:16
WORKDIR /SALES/src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "npx","nodemon", "server.ts" ]