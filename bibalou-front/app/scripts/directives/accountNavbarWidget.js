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
  console.log("HI");
    $scope.myAccount = function() {
      $location.path("/myAccount");
    };

    $scope.myProducts = function() {
      $location.path("/myProducts");
    };

    $scope.MyMarketPlace = function() {
      $location.path("/MyMarketPlace");
    };

    $scope.disconnect = function() {
      $scope.userCtrl.disconnect();
    }
  });
