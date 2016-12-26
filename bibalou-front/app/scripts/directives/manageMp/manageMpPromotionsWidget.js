'use strict';

/**
 * @ngdoc directive
 * @name BibalouApp.directive:manageMpPromotionsWidget
 * @description
 * # manageMpPromotionsWidget
 */
angular.module('BibalouApp')
  .directive('manageMpPromotionsWidget', function () {
    return {
      restrict: 'A',
      templateUrl: "views/marketPlaces/myMarketPlace/widget/mpPromotions.html",
      controller: "ManageMpPromotionsCtrl"
    }
  });
