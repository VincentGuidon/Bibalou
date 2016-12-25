'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('ProductCtrl', function ($scope, $routeParams, RequestAPI, SubmitResult, User) {
    $scope.id = $routeParams.id;
    $scope.comment = {};

    $scope.init = function () {
      RequestAPI.GET("/product", SubmitResult.submitSuccess(function (response) {
          $scope.product = response.data;
        }),
        SubmitResult.submitFailure(), {token: User.getToken(), id: $scope.id});
    };

    $scope.init();
  });
