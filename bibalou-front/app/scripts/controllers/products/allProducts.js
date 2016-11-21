'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:AllProductsCtrl
 * @description
 * # AllProductsCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('AllProductsCtrl', function ($scope, toaster, SubmitResult, RequestAPI, TokenManager) {
    $scope.idProduct = 9;

    $scope.init = function () {
      RequestAPI.GET("/products", SubmitResult.submitSuccess(function (response) {
          $scope.products = response.data;
        }),
        SubmitResult.submitFailure(), TokenManager.get());
    };

    $scope.init();
  });
