'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:ProceedOrderModalCtrl
 * @description
 * # ProceedOrderModalCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('ProceedOrderModalCtrl', function ($scope, $uibModalInstance, $location, RequestAPI, SubmitResult, User, CartManager) {

    $scope.paymentSelected = false;
    $scope.isBusy = false;

    $scope.order = {
      products: JSON.stringify(CartManager.getProducts()),
      total: CartManager.getPrice(),
      buyer: User.getId(),
      payment: ""
    };

    $scope.selectPayment = function (payment) {
      $scope.paymentSelected = true;
      $scope.order.payment = payment.id;
    };

    $scope.quit = function () {
      $uibModalInstance.dismiss('cancel');
    };

    function removeQuantityFromProduct() {
      var products = CartManager.getProducts();
      var max = products.length;
      var count = 0;

      for (var i = 0; i < products.length; ++i) {
        products[i].product.stock -= products[i].quantity;
        var product = {_id: products[i].product._id, stock: products[i].product.stock};
        RequestAPI.PUT("/products", product, SubmitResult.submitSuccess(function (response) {
            count += 1;
            if (count == max) {
              $scope.isBusy = false;
              CartManager.clear();
              $scope.quit();
              $location.path("/myDeliveries");
            }
          }),
          SubmitResult.submitFailure(function (response) {
            $scope.isBusy = false;
          }, {token: User.getToken()}));
      }
    }

    $scope.create = function () {
      $scope.isBusy = true;
      RequestAPI.POST("/orders", $scope.order, SubmitResult.submitSuccess(function (response) {
          removeQuantityFromProduct();
        }, "Order created!"),
        SubmitResult.submitFailure(function () {
          $scope.isBusy = false;
        }), {token: User.getToken()});
    };


    $scope.init = function () {
      RequestAPI.GET("/payments", SubmitResult.submitSuccess(function (response) {
          $scope.payments = response.data.payments;
        }),
        SubmitResult.submitFailure(), {token: User.getToken()});
    };

    $scope.init();
  });
