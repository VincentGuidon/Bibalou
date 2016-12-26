'use strict';

/**
 * @ngdoc directive
 * @name BibalouApp.directive:accountNavbarWidget
 * @description
 * # accountNavbarWidget
 */
angular.module('BibalouApp')
  .directive('accountNavbarWidget', function () {
    return {
      restrict: 'A',
      templateUrl: "views/account/accountNavbarWidget.html",
      controller: "AccountNavbarWidgetCtrl"
    }
  })
  .controller('AccountNavbarWidgetCtrl', function ($scope, $location, User) {

    $scope.userCtrl = User;
    $scope.myAccount = function() {
      $location.path("/myAccount");
    };

    $scope.myDeliveries = function() {
      $location.path("/myDeliveries");
    };

    $scope.myMarketPlace = function() {
      $location.path("/myMarketPlace");
    };

    $scope.disconnect = function() {
      $scope.userCtrl.disconnect();
    }
  });
