var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  date : { type : Date, default : Date.now},
  products : [Schema.Types.Mixed],
  payment : String,
  owner : String,
  market : String,
  buyer  : String
});

var Order = mongoose.model('Order', orderSchema);
module.exports = Order;
