var express = require('express');
var router = express.Router();

var types = [
  'book',
  'game',
  'cook',
  'CD & Vinyl',
  'clothing',
  'movie',
  'other'
];

router.get('/', function(req, res, next) {
  res.send({success : true, 'types' : types});
});


module.exports = router;
