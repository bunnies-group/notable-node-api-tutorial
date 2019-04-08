const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(database => {
    require('./app/routes')(app, database);

    app.listen(port, () => {
      console.log('We are live on ' + port);
    });
  })
  .catch(error => {
    console.log(error);

    process.exit(1);
  });
