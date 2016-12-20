var crypto = require('crypto');
var base64url = require('base64url');

var connectUser = [];

exports.genRandomToken = function(size) {
  var token = base64url(crypto.randomBytes(size));
  connectUser.push({'token' : token, rigth : 0});
  return token;
}

exports.connectUser = connectUser;
