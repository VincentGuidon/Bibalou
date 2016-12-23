var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var promotionSchema = new Schema({
  name: String,
  description : String,
  percent: Number,
  brut : Number,
  marketPlace : { type : String, Require : true}
});

var Promotion = mongoose.model('Promotions', promotionSchema);
module.exports = Promotion;
