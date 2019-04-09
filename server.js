'use strict';

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const url = process.env.MONGO_URL;

if (!url) {
  console.log(`'MONGO_URL' environment variable is required!`);

  process.exit(1);
}

const client = new MongoClient(url, { useNewUrlParser: true });

client.connect()
  .then(() => {
    const database = client.db('load_testing');

    require('./app/routes')(app, database);

    app.listen(port, () => {
      console.log('We are live on ' + port);
    });
  })
  .catch(error => {
    console.log(error);

    process.exit(1);
  });
