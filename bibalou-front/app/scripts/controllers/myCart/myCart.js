'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:MyCartCtrl
 * @description
 * # MyCartCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('MyCartCtrl', function ($scope, $location, CartManager) {

    $scope.changeQuantity = function(product) {
      CartManager.editProduct(product._id, $scope.focusedQuantity);
    };

    $scope.removeProduct = function(product) {
      CartManager.rmProduct(product._id);
    };

    $scope.proceedOrder = function() {

    };

    $scope.init = function() {
      $scope.products = CartManager.getProducts();
      console.log($scope.products);
    };

    $scope.getTotal = function() {
      return CartManager.getPrice();
    };

    $scope.init();
  });
