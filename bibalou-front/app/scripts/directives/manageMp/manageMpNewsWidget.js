'use strict';

/**
 * @ngdoc directive
 * @name BibalouApp.directive:manageMpNewsWidget
 * @description
 * # manageMpNewsWidget
 */
angular.module('BibalouApp')
  .directive('manageMpNewsWidget', function () {
    return {
      restrict: 'A',
      templateUrl: "views/marketPlaces/myMarketPlace/widget/mpNews.html",
      controller: "ManageMpNewsCtrl"
    }
  });
