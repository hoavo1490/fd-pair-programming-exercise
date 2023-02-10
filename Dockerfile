FROM node:14.17.3-alpine

WORKDIR /usr/src/app
RUN apk add --no-cache git
COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
EXPOSE 3001