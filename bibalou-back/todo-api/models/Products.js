var mongoose = require('mongoose');
var Product = mongoose.Schema;

var productSchema = new Product({
  name : String,
  description : String,
  price : Number,
  stock : Number,
  available : Boolean,
  image : String,
  type : String,
  promotion : Schema.Types.Mixed,
  type : String,
  marketPlace : String,
});

var Product = mongoose.model('Product', productSchema);
module.exports = Product;
