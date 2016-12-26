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
    var filterUnparsedProducts = function () {
      if ($scope.filter.bestPrice) {
        for (var i = 0; i < $scope.products.length; ++i) {
          for (var i2 = i + 1; i2 < $scope.products.length; ++i2) {
            if ($scope.products[i].name == $scope.products[i2].name) {

              if ($scope.products[i].stock == 0) {
                if ($scope.products[i].numberSame > $scope.products[i2]) {
                  $scope.products[i2].numberSame = $scope.products[i];
                }
                $scope.products[i2].numberSame += 1;
                $scope.products.splice(i, 1);
                --i;
                --i2;
              } else if ($scope.products[i2].stock == 0) {
                if ($scope.products[i].numberSame < $scope.products[i2]) {
                  $scope.products[i].numberSame = $scope.products[i2];
                }
                $scope.products[i].numberSame += 1;
                $scope.products.splice(i2, 1);
                --i2;
              }
              if ($scope.products[i].price > $scope.products[i2].price) {
                if ($scope.products[i].numberSame > $scope.products[i2]) {
                  $scope.products[i2].numberSame = $scope.products[i];
                }
                $scope.products[i2].numberSame += 1;
                $scope.products.splice(i, 1);
                --i;
                --i2;
              } else {
                if ($scope.products[i].numberSame < $scope.products[i2]) {
                  $scope.products[i].numberSame = $scope.products[i2];
                }
                $scope.products[i].numberSame += 1;
                $scope.products.splice(i2, 1);
                --i2;
              }
            }
          }
        }
      }
    };

    var parseByType = function () {
      if ($scope.type.name != "All") {
        for (var i = 0; i < $scope.products.length; ++i) {
          if ($scope.products[i].type.name != $scope.type.name) {
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
      $scope.products = CloneUtilsCustom.cloneArray($scope.unparsedProducts);

      for (var i = 0; i < $scope.products.length; ++i) {
        $scope.products[i].numberSame = 0;
      }
      filterUnparsedProducts();
      parseByType();
      parseByName();
      $scope.sortParsedProducts();
    };

    function compareProductsPriceUp(a, b) {
      if (a.price < b.price)
        return -1;
      else
        return 1;
    }

    function compareProductsPriceDown(a, b) {
      if (a.price < b.price)
        return 1;
      else
        return -1;
    }

    function compareName(a, b) {
      if (a.name < b.name)
        return 1;
      else
        return -1;
    }

    $scope.sortParsedProducts = function () {
      if ($scope.filter.price == "UP") {
        $scope.products.sort(compareProductsPriceUp);
      } else {
        $scope.products.sort(compareProductsPriceDown);
      }
      if ($scope.filter.name) {
        $scope.products.sort(compareName);
      }
    };

    /** FUNCTION **/

    $scope.addProduct = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/products/AddProductModal.html',
        controller: 'AddProductModalCtrl',
        size: 'lg',
        resolve: {
          ParentProduct: function () {
            return {saved: null};
          }
        }
      });
    };

    $scope.editProduct = function(product) {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/products/editProductModal.html',
        controller: 'EditProductModalCtrl',
        size: 'lg',
        resolve: {
          ParentProduct: function () {
            return {saved: product};
          }
        }
      });
    };

    $scope.available = function(product) {
      product.available = !product.available;
      RequestAPI.DELETE("/products", product, SubmitResult.submitSuccess(function (response) {
        }),
        SubmitResult.submitFailure(), {token: User.getToken()});
    };

    $scope.deleteProduct = function(id) {
      RequestAPI.DELETE("/products", SubmitResult.submitSuccess(function (response) {
        }),
        SubmitResult.submitFailure(), {token: User.getToken(), id: id});
    };

    /** LOAD **/
    $scope.loadProducts = function () {
      $scope.unparsedProducts = [];
      $scope.products = [];
      RequestAPI.GET("/products", SubmitResult.submitSuccess(function (response) {
          $scope.unparsedProducts = response.data;
          $scope.parseUnparsedProducts();
        }),
        SubmitResult.submitFailure(), {token: User.getToken()});
    };

    $scope.loadParser = function () {
      $scope.types = [];
      $scope.type = "All";
      $scope.filter = {"price": "UP", "bestPrice": true, "name": true};

      RequestAPI.GET("/types", SubmitResult.submitSuccess(function (response) {
          $scope.types = response.data.types;
          $scope.types.splice(0, 0, "All");
          console.log($scope.types);
        }),
        SubmitResult.submitFailure(), {token: User.getToken()});
    };

    $scope.init = function () {
      $scope.loadParser();
      $scope.loadProducts();
    };

    $scope.refresh = function () {
      $scope.init();
    };

    $scope.init();

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
        $scope.parseProducts();
      }, tempo); // delay in ms
    })
  });
