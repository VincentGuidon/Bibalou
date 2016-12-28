'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:DeliveryDetailCtrl
 * @description
 * # DeliveryDetailCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('DeliveryDetailCtrl', function ($scope, $routeParams, RequestAPI, SubmitResult, User) {

    $scope.init = function () {
      RequestAPI.GET("/orders/byId", SubmitResult.submitSuccess(function (response) {
          $scope.order = response.data.order;
          $scope.order.products = JSON.parse($scope.order.products);
        }),
        SubmitResult.submitFailure(), {token: User.getToken(), id: $routeParams.id});

    };

    $scope.init();
  });
