'use strict';

const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  app.route('/notes/:id')
    .get((req, res) => {
      const { id } = req.params;
      const details = { '_id': new ObjectID(id) };

      db
        .collection('notes')
        .findOne(details)
        .then(item => { res.send(item); })
        .catch(error => { res.send(error); });
    })
    .put((req, res) => {
      const { id } = req.params;
      const details = { '_id': new ObjectID(id) };
      const note = {
        text: req.body.body,
        title: req.body.title
      };

      db
        .collection('notes')
        .update(details, note)
        .then(() => { res.send(note); })
        .catch(error => { res.send(error); });
    })
    .delete((req, res) => {
      const { id } = req.params;
      const details = { '_id': new ObjectID(id) };

      db
        .collection('notes')
        .remove(details)
        .then(() => { res.send('Note ' + id + ' deleted!'); })
        .catch(error => { res.send(error); });
    });

  app.route('/notes')
    .get((req, res) => {
      db
        .collection('notes')
        .find({})
        .toArray()
        .then(result => { res.send(result); })
    })
    .post((req, res) => {
      const note = {
        text: req.body.body,
        title: req.body.title
      };

      db
        .collection('notes')
        .insert(note)
        .then(result => { res.send(result.ops[0]); })
        .catch(error => { res.send(error); });
    });
};
