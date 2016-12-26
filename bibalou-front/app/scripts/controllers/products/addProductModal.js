'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:AddproductmodalCtrl
 * @description
 * # AddproductmodalCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('AddProductModalCtrl', function ($scope, $uibModalInstance, RequestAPI, SubmitResult, User, ParentProduct) {
    $scope.flow = {};
    $scope.mode = [
      {title: "Edit Product", btnCancel: {title: "Cancel", action: cancel}, btnValid: {title: "Save", action: edit}},
      {
        title: "Create a Product",
        btnCancel: {title: "Cancel", action: exit},
        btnValid: {title: "Create", action: create}
      }
    ];

    $scope.isBusy = false;
    $scope.current = 1;
    $scope.product = {
      owner: User.getId(),
      name: "",
      description: "",
      image: ""
    };


    function cancel() {
      fillProduct();
    }

    function exit() {
      $scope.clear();
    }

    function edit() {
      $scope.isBusy = true;
      RequestAPI.PUT("/products", $scope.product, SubmitResult.submitSuccess(function (response) {
          $scope.isBusy = false;
          $scope.clear();
        }),
        SubmitResult.submitFailure(function (response) {
          $scope.isBusy = false;
        }, {token: User.getToken()}));
    }

    function create() {
      $scope.isBusy = true;
      RequestAPI.POST("/products", $scope.product, SubmitResult.submitSuccess(function (response) {
          $scope.isBusy = false;
          $scope.clear();
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
      $scope.product.price = $scope.productSave.price;
      $scope.product.type = $scope.productSave.type;
      $scope.product._id = $scope.productSave._id;
    }

    $scope.clear = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.init = function() {
      if (ParentProduct.saved) {
        $scope.productSave = ParentProduct.saved;
        $scope.mode = 1;
        fillProduct();
      } else {
        $scope.mode = 2;
      }
    };

    $scope.init();
  });
