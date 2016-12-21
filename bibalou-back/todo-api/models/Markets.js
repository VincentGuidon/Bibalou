var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('../models/Products.js');

/*
var ToySchema = new Schema({ name: String });
var ToyBox = new Schema({
  toys: [ToySchema],
  buffers: [Buffer],
  string:  [String],
  numbers: [Number]
  // ... etc
});
*/

var marketSchema = new Schema({
  name: { type: String, required: true, unique: true },
  desription: String,
  productList : String,
  owner : { type: String, required: true },
  image : String,
});

var Market = mongoose.model('Market', marketSchema);
module.exports = Market;
