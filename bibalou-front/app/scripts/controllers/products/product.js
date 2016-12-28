'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('ProductCtrl', function ($scope, $routeParams, RequestAPI, SubmitResult, User, CartManager) {


    $scope.addToCart = function (product, quantity) {
      if (quantity > 0) {
        CartManager.addProduct(product, quantity);
      }
    };

    $scope.init = function () {
      RequestAPI.GET("/products/byId", SubmitResult.submitSuccess(function (response) {
          $scope.product = response.data.product;
          RequestAPI.GET("/marketPlaces/byName", SubmitResult.submitSuccess(function (response) {
              $scope.product.marketPlace = response.data.marketPlace;
              RequestAPI.GET("/user/byId", SubmitResult.submitSuccess(function (response) {
                  $scope.product.marketPlace.owner = response.data.user;
                }),
                SubmitResult.submitFailure(), {token: User.getToken(), id: $scope.product.marketPlace.owner});
            }),
            SubmitResult.submitFailure(), {token: User.getToken(), name: $scope.product.marketPlace});
        }),
        SubmitResult.submitFailure(), {token: User.getToken(), id: $routeParams.id});
    };

    $scope.init();
  });
