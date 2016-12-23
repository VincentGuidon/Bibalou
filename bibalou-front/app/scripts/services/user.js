'use strict';

/**
 * @ngdoc service
 * @name BibalouApp.user
 * @description
 * # user
 * Factory in the BibalouApp.
 */
angular.module('BibalouApp')
  .factory('User', function ($cookies, DateTools) {
    // Service logic
    var idUserCo = "userConnected";
    var idUserId = "userId";
    var idToken = "token";
    var timeOut = 360;

    var init = function () {
      var token = $cookies.get(idToken);
      (token == null ? disconnect() : connect());
    };

    function connect(token, userId) {
      $cookies.put(idUserCo, true, {
        expires: DateTools.addMinutesToCurrentDate(timeOut)
      });
      $cookies.put(idUserId, userId, {
        expires: DateTools.addMinutesToCurrentDate(timeOut)
      });
      $cookies.put(idToken, token, {
        expires: DateTools.addMinutesToCurrentDate(timeOut)
      });
    }

    function update(token) {
      var userId = $cookies.get(idUserId);

      if (token && userId) {
        connect(token, userId);
      }
    }

    function disconnect() {
      $cookies.remove(idUserCo);
      $cookies.remove(idToken);
      $cookies.remove(idUserId)
    }

    // Public API here
    return {
      getToken: function () {
        return $cookies.get(idToken);
      },
      getId: function () {
        return $cookies.get(idUserId);
      },
      update: function (token) {
        update(token);
      },
      isConnected: function () {
        var id = $cookies.get(idUserCo);

        if (id == null) {
          init();
          id = false;
        }
        return id;
      },
      connect: function (token, userId) {
        connect(token, userId);
      },
      disconnect: function () {
        disconnect();
      }
    };
  });
