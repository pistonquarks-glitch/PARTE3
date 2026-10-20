const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.get('/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

router.post('/', (request, response) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    response.json(savedPerson);
  });
});

router.delete('/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = router;