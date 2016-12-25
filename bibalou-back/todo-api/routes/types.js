var express = require('express');
var router = express.Router();

var types = [
  'book',
  'game',
  'movie',
  'cooking',
  'CD & Vinyl',
  'clothes',
  'jewellery',
  'other'
];

router.get('/', function(req, res, next) {
  res.send({success : true, 'types' : types});
});

module.exports = router;
