var express = require('express');
var router = express.Router();

var types = [
  'Books',
  'Games',
  'Movies',
  'Cooking',
  'CD & Vinyls',
  'Clothes',
  'Jewellery',
  'Other'
];

router.get('/', function(req, res, next) {
  res.send({success : true, 'types' : types});
});

module.exports = router;
