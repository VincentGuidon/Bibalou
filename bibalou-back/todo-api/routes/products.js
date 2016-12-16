var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Product = require('../models/Products.js');
//var Auth = require('../models/Authenticate.js');

router.get('/all', function(req, res, next) {
  Product.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

router.post('/register', function(req, res, next) {

  console.log(req.body.name);

  var nProduct = new Product({
    name : req.body.name,
    description : req.body.description,
    price : req.body.price,

    stock : req.body.stock,
    available : req.body.available,
    image : req.body.image,
    type : req.body.type
  })

  nProduct.save(function(err) {
    if (err)
    {
      res.send({Success:false});
      throw err
    };
    console.log('Product saved successfully!');
  });

  res.send({Success:true});
});

module.exports = router;
