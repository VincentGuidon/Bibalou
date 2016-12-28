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
  .controller('AccountNavbarWidgetCtrl', function ($scope, $location, User, RequestAPI, SubmitResult) {

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
      User.disconnect();/*
      RequestAPI.POST("/authenticate/disconnect", {token: User.getToken()},
      SubmitResult.submitSuccess(function (response) {
        $location.path("/");
      }, "Disconnected"),
      SubmitResult.submitFailure(function (response) {
        $scope.isBusy = false;
      }, "Disconnexion Failed"));*/
    }
  });
