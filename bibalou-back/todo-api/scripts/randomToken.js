var crypto = require('crypto');
var base64url = require('base64url');

var connectUser = [];

exports.genRandomToken = function(size, mail, id) {
  var token = base64url(crypto.randomBytes(size));
  connectUser.push({'token' : token, 'id' : id, 'mail' : mail, rigth : 0});
  return token;
}

exports.findUserConnected = function(token) {

  var allConnected = Object.keys(connectUser);
  var ret = {};
  allConnected.forEach(function(connected) {
    if (connectUser[connected].token == token)
    {
      ret.token = token;
      ret.mail = connectUser[connected].mail;
      ret.right = connectUser[connected].rigth;
      ret.id = connectUser[connected].id;
    }
//    console.log(connectUser[connected].token + ' ' + connectUser[connected].mail + ' ' + connectUser[connected].rigth);
  });
  return ret;
}

//exports.connectUser = connectUser;
