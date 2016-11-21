'use strict';

/**
 * @ngdoc service
 * @name BibalouApp.dateTools
 * @description
 * # dateTools
 * Factory in the BibalouApp.
 */
angular.module('BibalouApp')
  .factory('DateTools', function () {

    return {
      addSecondsToCurrentDate: function (seconds) {
        var date = new Date();
        date.setSeconds(date.getSeconds() + seconds);
        return date;
      },
      addMinutesToCurrentDate: function (minutes) {
        var date = new Date();
        date.setMinutes(date.getMinutes() + minutes);
        return date;
      },
      diffBySeconds: function (date1, date2) {
        return (date2 - date1) / 1000;
      }
    };
  });
