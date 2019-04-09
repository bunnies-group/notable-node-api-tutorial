FROM node:8

COPY . /project

WORKDIR /project

RUN apt-get update
RUN npm install

EXPOSE 8000

ENTRYPOINT node server.js
