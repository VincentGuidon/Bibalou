var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo = require('../models/Todo.js');
/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

router.put('/:id', function(req, res, next) {
  console.log(req.params.id);
  Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /todos */
router.post('/', function(req, res, next) {
  Todo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/:id', function(req, res, next) {
  Todo.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//localhost:3000/todos?name=azer
router.get('/:name', function(req, res, next) {
  var name = req.params.name;
  Todo.find(name, function (err, post) {
    if (err) return next(err);
    res.json(post[0]);
  });
});



module.exports = router;
