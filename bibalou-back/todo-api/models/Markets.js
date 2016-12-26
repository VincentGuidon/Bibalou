var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('../models/Products.js');
var Promotion = require('../models/Promotions.js');

var marketSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  productList : [Schema.Types.Mixed],
  owner : { type: String, required: true },
  order : [Schema.Types.Mixed],
  promotions : [Schema.Types.Mixed],
  news : [String], //{id: String, title: String, content: String, date: Date}]
  image : String
});

var Market = mongoose.model('Market', marketSchema);
module.exports = Market;
