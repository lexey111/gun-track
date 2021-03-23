FROM node:lts-alpine3.10
LABEL maintainer="lexey111@gmail.com"

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci --no-optional
