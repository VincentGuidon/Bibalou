'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:AddProductModalCtrl
 * @description
 * # AddProductModalCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('AddProductModalCtrl', function ($scope, $uibModalInstance, RequestAPI, SubmitResult, User, Parent) {

    $scope.isBusy = false;
    $scope.current = 1;
    $scope.mode = [
      {title: "Edit Product", btnCancel: {title: "Clear", action: clear}, btnValid: {title: "Save", action: edit}},
      {
        title: "Create a Product",
        btnCancel: {title: "Cancel", action: exit},
        btnValid: {title: "Create", action: create}
      }
    ];
    $scope.product = {
      owner: User.getId(),
      name: "",
      description: "",
      image: ""
    };

    function clear() {
      fillProduct();
    }

    function exit() {
      $scope.quit();
    }

    function edit() {
      $scope.isBusy = true;
      RequestAPI.PUT("/products", $scope.product, SubmitResult.submitSuccess(function (response) {
          $scope.isBusy = false;
          $scope.quit();
        }),
        SubmitResult.submitFailure(function (response) {
          $scope.isBusy = false;
        }, {token: User.getToken()}));
    }

    function create() {
      $scope.isBusy = true;
      $scope.product.marketPlace = Parent.marketPlace.name;
      $scope.product.available = true;
       RequestAPI.POST("/products", $scope.product, SubmitResult.submitSuccess(function (response) {
       $scope.isBusy = false;
       $scope.quit();
       }),
       SubmitResult.submitFailure(function (response) {
       $scope.isBusy = false;
       }, {token: User.getToken()}));
    }

    $scope.limitFiles = function ($files, max) {
      if ($files.length > max) {
        $files.length = max;
      }
    };

    function fillProduct() {
      $scope.product.description = $scope.productSave.description;
      $scope.product.image = $scope.productSave.image;
      $scope.product.name = $scope.productSave.name;
      $scope.product.price = $scope.productSave.price;
      $scope.product.sill = $scope.productSave.sill;
      $scope.product.type = $scope.productSave.type;
      $scope.product._id = $scope.productSave._id;
    }

    $scope.quit = function () {
      Parent.finishAction();
      $uibModalInstance.dismiss('cancel');
    };

    $scope.init = function () {
      RequestAPI.GET("/types", SubmitResult.submitSuccess(function (response) {
          $scope.types = response.data.types;
        }),
        SubmitResult.submitFailure(), {token: User.getToken()});
      if (Parent.product) {
        $scope.productSave = Parent.product;
        $scope.current = 0;
        fillProduct();
      } else {
        $scope.current = 1;
      }
    };

    $scope.init();
  });
