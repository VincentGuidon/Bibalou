'use strict';

/**
 * @ngdoc directive
 * @name BibalouApp.directive:manageMpProductsWidget
 * @description
 * # manageMpProductsWidget
 */
angular.module('BibalouApp')
  .directive('manageMpProductsWidget', function () {
    return {
      restrict: 'A',
      templateUrl: "views/marketPlaces/myMarketPlace/widget/mpProducts.html",
      controller: "ManageMpProductsCtrl"
    }
  });
