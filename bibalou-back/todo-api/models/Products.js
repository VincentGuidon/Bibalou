var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name : String,
  description : String,
  price : Number,
  stock : Number,
  sill: Number,
  available : Boolean,
  image : String,
  type : String,
  promotion : Schema.Types.Mixed,
  marketPlace : String
});

var Product = mongoose.model('Product', productSchema);
module.exports = Product;
