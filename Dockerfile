FROM node:alpine

WORKDIR /usr/app

COPY package.json ./

COPY package-lock.json ./

COPY ./ ./

RUN apk add --no-cache bash

CMD ["npm", "start"]
