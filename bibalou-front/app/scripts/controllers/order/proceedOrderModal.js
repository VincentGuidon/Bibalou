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

    $scope.isBusy = false;

    $scope.order = {
      products: JSON.stringify(CartManager.getProducts()),
      total: CartManager.getPrice(),
      buyer: User.getId(),
      payment: ""
    };

    $scope.selectPayment = function (payment) {
      $scope.order.payment = payment.id;
    };

    $scope.quit = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.create = function () {
      $scope.isBusy = true;
      RequestAPI.POST("/orders", $scope.order, SubmitResult.submitSuccess(function (response) {
          $scope.isBusy = false;
          CartManager.clear();
          $scope.quit();
          $location.path("/myDeliveries")
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
