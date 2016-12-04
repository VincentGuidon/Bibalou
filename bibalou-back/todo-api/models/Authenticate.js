var mongoose = require('mongoose');
var AuthSchema = new mongoose.Schema({
  token: String,
  success: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Authenticate', AuthSchema);
