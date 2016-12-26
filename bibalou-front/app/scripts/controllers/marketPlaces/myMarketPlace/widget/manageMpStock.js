'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:ManageMpStockCtrl
 * @description
 * # ManageMpStockCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('ManageMpStockCtrl', function ($scope, $timeout, $uibModal, toaster, SubmitResult, RequestAPI, User, CloneUtilsCustom) {

    $scope.states = [{id: -1, name: "All"}, {id: 0, name: "Good"}, {id: 1, name: "Warning"}, {id: 2, name: "Alert"}];

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
      if ($scope.currentStatus != "All") {
        for (var i = 0; i < $scope.products.length; ++i) {
          if (!$scope.isState($scope.products[i], $scope.currentStatus)) {
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
      console.log("salut", $scope.marketPlace)
      $scope.products = CloneUtilsCustom.cloneArray($scope.marketPlace.productList);

      console.log($scope.products);
      parseByType();
      parseByStatus();
      parseByName();
      $scope.sortParsedProducts();
      console.log("end", $scope.products);
    };

    function compareName(a, b) {
      if (a.name < b.name)
        return 1;
      else
        return -1;
    }

    function getState(param){
      if (param.stock == 0) {
        return $scope.states[2];
      } else if (param.stock <= param.sill) {
        return $scope.states[1];
      } else {
        return $scope.states[0];
      }
    }

    /** FUNCTION **/

    $scope.sortParsedProducts = function () {
      if ($scope.filter.name) {
        $scope.products.sort(compareName);
      }
    };

    $scope.isState = function(product, param){
      return getState(product).id == param;
    };

    $scope.addQuantity = function (product) {
      product.stock += $scope.quantity;

      RequestAPI.PUT("/products", product, SubmitResult.submitSuccess(function (response) {
        }),
        SubmitResult.submitFailure(), {token: User.getToken()});
    };

    $scope.changeQuantity = function (value) {
      $scope.quantity = value;
    };

    $scope.editProduct = function (product) {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/products/AddProductModal.html',
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
      $scope.currentStatus = $scope.states[0];
      $scope.filter = {"name": true};

      RequestAPI.GET("/types", SubmitResult.submitSuccess(function (response) {
          $scope.types = response.data.types;
          $scope.types.splice(0, 0, "All");
          console.log($scope.types);
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
        if (!$scope.searchProduct && $scope.searchProduct != "") {
          return;
        }
        $scope.parseUnparsedProducts();
      }, tempo); // delay in ms
    })
  });
