var crypto = require('crypto');
var base64url = require('base64url');

var connectUser = [];

exports.genRandomToken = function(size, mail) {
  var token = base64url(crypto.randomBytes(size));
  connectUser.push({'token' : token, 'mail' : mail, rigth : 0});
  return token;
}

exports.findUserConnected = function(token) {

  var allConnected = Object.keys(connectUser);
  allConnected.forEach(function(connected) {
    

  });

//process(['foo', 'bar', 'help']);
}

//exports.connectUser = connectUser;
