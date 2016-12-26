'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:ManageMpProductsCtrl
 * @description
 * # ManageMpProductsCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('ManageMpProductsCtrl', function ($scope, $timeout, $uibModal, toaster, SubmitResult, RequestAPI, User, CloneUtilsCustom) {

    /** UTILS**/

    var parseByType = function () {
      if ($scope.type != "All") {
        for (var i = 0; i < $scope.products.length; ++i) {
          if ($scope.products[i].type != $scope.type) {
            $scope.products.splice(i, 1);
            --i;
          }
        }
      }
    };

    var parseByStatus = function () {
      if ($scope.currentStatus.name != "All") {
        for (var i = 0; i < $scope.products.length; ++i) {
          if ($scope.products[i].available != $scope.currentStatus.value) {
            $scope.products.splice(i, 1);
            --i;
          }
        }
      }
    };

    var parseByName = function () {
      if ($scope.searchProduct && $scope.searchProduct != "") {
        for (var i = 0; i < $scope.products.length; ++i) {
          if (!$scope.products[i].name.includes($scope.searchProduct)) {
            $scope.products.splice(i, 1);
            --i;
          }
        }
      }
    };

    $scope.parseUnparsedProducts = function () {
      $scope.products = CloneUtilsCustom.cloneArray($scope.marketPlace.productList);

      parseByType();
      parseByStatus();
      parseByName();
      $scope.sortParsedProducts();
    };

    function compareName(a, b) {
      if (a.name < b.name)
        return 1;
      else
        return -1;
    }

    $scope.sortParsedProducts = function () {
      if ($scope.filter.name) {
        $scope.products.sort(compareName);
      }
    };

    /** FUNCTION **/

    $scope.addProduct = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/products/addProductModal.html',
        controller: 'AddProductModalCtrl',
        size: 'lg',
        resolve: {
          Parent: function () {
            return {product: null, marketPlace: $scope.marketPlace, finishAction: $scope.reloadProducts};
          }
        }
      });
    };

    $scope.editProduct = function (product) {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/products/addProductModal.html',
        controller: 'AddProductModalCtrl',
        size: 'lg',
        resolve: {
          Parent: function () {
            return {product: product, marketPlace: $scope.marketPlace, finishAction: $scope.reloadProducts};
          }
        }
      });
    };

    $scope.available = function (product) {
      product.available = !product.available;
      RequestAPI.PUT("/products", product, SubmitResult.submitSuccess(function (response) {
        }),
        SubmitResult.submitFailure(), {token: User.getToken()});
    };

    $scope.delete = function (id) {
      RequestAPI.DELETE("/products", SubmitResult.submitSuccess(function (response) {
          $scope.reloadProducts();
        }),
        SubmitResult.submitFailure(), {token: User.getToken(), id: id});
    };

    /** LOAD **/
    $scope.loadProducts = function () {
      $scope.parseUnparsedProducts();
    };

    $scope.loadParser = function () {
      $scope.types = [];
      $scope.type = "All";
      $scope.status = [{name: "All", value: true}, {name: "Available", value: true}, {
        name: "Unavailable",
        value: false
      }];
      $scope.currentStatus = $scope.status[0];
      $scope.filter = {"name": true};

      RequestAPI.GET("/types", SubmitResult.submitSuccess(function (response) {
          $scope.types = response.data.types;
          $scope.types.splice(0, 0, "All");
        }),
        SubmitResult.submitFailure(), {token: User.getToken()});
    };

    $scope.reloadProducts = function () {
      RequestAPI.GET("/products/byMarketName", SubmitResult.submitSuccess(function (response) {
          $scope.marketPlace.productList = response.data.products;
          $scope.busy = false;
          $scope.loadProducts();
        }),
        SubmitResult.submitFailure(function () {
        }), {token: User.getToken(), marketName: $scope.marketPlace.name});
    };

    $scope.initMpProduct = function () {
      $scope.loadParser();
      $scope.loadProducts();
    };

    $scope.initMpProduct();

    // Instantiate these variables outside the watch
    var tempo = 400;
    var tempFilterText = '',
      filterTextTimeout;

    $scope.$watch('searchProduct', function (val) {
      if (filterTextTimeout) {
        $timeout.cancel(filterTextTimeout);
      }
      tempFilterText = val;
      filterTextTimeout = $timeout(function () {
        if (!$scope.searchProduct) {
          return;
        }
        $scope.parseUnparsedProducts();
      }, tempo); // delay in ms
    })
  });
