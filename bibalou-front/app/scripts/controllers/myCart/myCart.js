'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:MyCartCtrl
 * @description
 * # MyCartCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('MyCartCtrl', function ($scope, $uibModal, $location, CartManager) {

    $scope.changeQuantity = function(product, quantity) {
      CartManager.editProduct(product._id, quantity);
      $scope.init();
    };

    $scope.removeProduct = function(product) {
      CartManager.rmProduct(product._id);
      $scope.init();
    };

    $scope.proceedOrder = function() {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/order/proceedOrderModal.html',
          controller: 'ProceedOrderModalCtrl',
          size: 'lg'
        });
    };

    $scope.clearAll = function() {
      CartManager.clear();
      $scope.init();
    };

    $scope.init = function() {
      $scope.products = CartManager.getProducts();
    };

    $scope.getTotal = function() {
      return CartManager.getPrice();
    };

    $scope.init();
  });
