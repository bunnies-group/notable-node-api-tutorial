'use strict';

const { ObjectID } = require('mongodb');

module.exports = (app, db) => {
  app.route('/notes/:id')
    .get((req, res) => {
      const { id } = req.params;
      const details = { _id: new ObjectID(id) };

      db
        .collection('notes')
        .findOne(details)
        .then(item => {
          res.send({
            message: 'Note!',
            data: item
          });
        })
        .catch(error => { res.send(error); });
    })
    .put((req, res) => {
      const { id } = req.params;
      const details = { _id: new ObjectID(id) };
      const update = {
        $set: {
          text: req.body.body,
          title: req.body.title
        }
      };

      db
        .collection('notes')
        .updateOne(details, update)
        .then(() => {
          res.send({
            message: 'Updated!',
            data: update.$set
          });
        })
        .catch(error => { res.send(error); });
    })
    .delete((req, res) => {
      const { id } = req.params;
      const details = { _id: new ObjectID(id) };

      db
        .collection('notes')
        .deleteOne(details)
        .then(() => {
          res.send({
            message: `Note ${id} deleted!`
          });
        })
        .catch(error => { res.send(error); });
    });

  app.route('/notes')
    .get((req, res) => {
      db
        .collection('notes')
        .find({})
        .toArray()
        .then(result => {
          res.send({
            message: 'Notes!',
            data: result
          });
        });
    })
    .post((req, res) => {
      const note = {
        text: req.body.body,
        title: req.body.title
      };

      db
        .collection('notes')
        .insertOne(note)
        .then(result => {
          res.send({
            message: `Note ${result.insertedId} created!`
          });
        })
        .catch(error => { res.send(error); });
    });
};
