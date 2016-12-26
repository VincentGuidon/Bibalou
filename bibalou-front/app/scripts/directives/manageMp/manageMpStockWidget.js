'use strict';

/**
 * @ngdoc directive
 * @name BibalouApp.directive:manageMpStockWidget
 * @description
 * # manageMpStockWidget
 */
angular.module('BibalouApp')
  .directive('manageMpStockWidget', function () {
    return {
      restrict: 'A',
      templateUrl: "views/marketPlaces/myMarketPlace/widget/mpStock.html",
      controller: "ManageMpStockCtrl"
    }
  });
