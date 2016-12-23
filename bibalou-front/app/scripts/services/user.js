'use strict';

/**
 * @ngdoc service
 * @name BibalouApp.user
 * @description
 * # user
 * Factory in the BibalouApp.
 */
angular.module('BibalouApp')
  .factory('User', function ($cookies, DateTools, TokenManager) {
    // Service logic
    var idUserCo = "userConnected";
    var idUserId = "userId";
    var idToken = "token";
    var timeOut = 360;

    var init = function() {
      var token = TokenManager.get();
      (token == null ? disconnect() : connect());
    };

    var connect = function(token, userId) {
      $cookies.put(idUserCo, true, {
        expires: DateTools.addMinutesToCurrentDate(timeOut)
      });
      $cookies.put(idUserId, userId, {
        expires: DateTools.addMinutesToCurrentDate(timeOut)
      });
      TokenManager.put(token);
    };

    var disconnect = function() {
      $cookies.remove(idUserCo);
      $cookies.remove(idToken);
      $cookies.remove(idUserId)
    };

    // Public API here
    return {
      isConnected: function () {
        var id = $cookies.get(idUserCo);

        if (id == null) {
          init();
          id = false;
        }
        return id;
      },
      connect: function(token, userId) {
        connect(token, userId);
      },
      disconnect: function () {
        disconnect();
      },
      getId: function() {
        return $cookies.get(idUserId);
      }
    };
  });
