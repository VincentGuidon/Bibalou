var crypto = require('crypto');
var base64url = require('base64url');

var connectUser = [];

exports.genRandomToken = function (size, mail, id) {
    var token = base64url(crypto.randomBytes(size));
    connectUser.push({'token': token, 'id': id, 'mail': mail, rigth: 0});
    return token;
};

exports.removeToken = function(token) {
    for (var i = 0; i < connectUser.length; ++i) {
        if (connectUser[i].token == token) {
            connectUser.splice(i, 1);
            return true;
        }
    }
    return false;
};

exports.findUserConnected = function (token) {
    var allConnected = Object.keys(connectUser);
    allConnected.forEach(function (connected) {

        if (connectUser[connected].token === token) {
            return connectUser[connected];
        }
//    console.log(connectUser[connected].token + ' ' + connectUser[connected].mail + ' ' + connectUser[connected].rigth);
    });
    return null;
};

//exports.connectUser = connectUser;
