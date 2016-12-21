'use strict';

/**
 * @ngdoc service
 * @name BibalouApp.tokenManager
 * @description
 * # tokenManager
 * Factory in the BibalouApp.
 */
angular.module('BibalouApp')
  .factory('TokenManager', function ($cookies, DateTools) {
    // Service logic
    var id = "token";
    var timeOut = 30;

    // Public API here
    return {
      get: function () {
        return $cookies.get(id);
      },
      put: function(value) {
        $cookies.put(id, value);
        /*
        $cookies.put(id, value,  {
          expires: DateTools.addMinutesToCurrentDate(timeOut)
        });*/
      },
      remove: function() {
        $cookies.remove(id);
      }
    };
  });
