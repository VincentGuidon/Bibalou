'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:AllProductsCtrl
 * @description
 * # AllProductsCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('AllProductsCtrl', function ($scope, $timeout, toaster, SubmitResult, RequestAPI, TokenManager, CloneUtilsCustom) {

    /** UTILS**/
    var filterUnparsedProducts = function () {
      if ($scope.filter.bestPrice) {
        for (var i = 0; i < $scope.parsedProducts.length; ++i) {
          for (var i2 = i + 1; i2 < $scope.parsedProducts.length; ++i2) {
            if ($scope.parsedProducts[i].name == $scope.parsedProducts[i2].name) {

              if ($scope.parsedProducts[i].stock == 0) {
                if ($scope.parsedProducts[i].numberSame > $scope.parsedProducts[i2]) {
                  $scope.parsedProducts[i2].numberSame = $scope.parsedProducts[i];
                }
                $scope.parsedProducts[i2].numberSame += 1;
                $scope.parsedProducts.splice(i, 1);
                --i;
                --i2;
              } else if ($scope.parsedProducts[i2].stock == 0) {
                if ($scope.parsedProducts[i].numberSame < $scope.parsedProducts[i2]) {
                  $scope.parsedProducts[i].numberSame = $scope.parsedProducts[i2];
                }
                $scope.parsedProducts[i].numberSame += 1;
                $scope.parsedProducts.splice(i2, 1);
                --i2;
              }
              if ($scope.parsedProducts[i].price > $scope.parsedProducts[i2].price) {
                if ($scope.parsedProducts[i].numberSame > $scope.parsedProducts[i2]) {
                  $scope.parsedProducts[i2].numberSame = $scope.parsedProducts[i];
                }
                $scope.parsedProducts[i2].numberSame += 1;
                $scope.parsedProducts.splice(i, 1);
                --i;
                --i2;
              } else {
                if ($scope.parsedProducts[i].numberSame < $scope.parsedProducts[i2]) {
                  $scope.parsedProducts[i].numberSame = $scope.parsedProducts[i2];
                }
                $scope.parsedProducts[i].numberSame += 1;
                $scope.parsedProducts.splice(i2, 1);
                --i2;
              }
            }
          }
        }
      }
    };

    var parseByType = function () {
      if ($scope.type.name != "All") {
        for (var i = 0; i < $scope.parsedProducts.length; ++i) {
          if ($scope.parsedProducts[i].type.name != $scope.type.name) {
            $scope.parsedProducts.splice(i, 1);
            --i;
          }
        }
      }
    };

    var parseByName = function () {
      if ($scope.searchProduct && $scope.searchProduct != "") {
        for (var i = 0; i < $scope.parsedProducts.length; ++i) {
          if (!$scope.parsedProducts[i].name.includes($scope.searchProduct)) {
            $scope.parsedProducts.splice(i, 1);
            --i;
          }
        }
      }
    };

    $scope.parseUnparsedProducts = function () {
      $scope.parsedProducts = CloneUtilsCustom.cloneArray($scope.unparsedProducts);

      for (var i = 0; i < $scope.parsedProducts.length; ++i) {
        $scope.parsedProducts[i].numberSame = 0;
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

    $scope.sortParsedProducts = function () {
      if ($scope.filter.price == "UP") {
        $scope.parsedProducts.sort(compareProductsPriceUp);
      } else {
        $scope.parsedProducts.sort(compareProductsPriceDown);
      }
      if ($scope.filter.name) {
        $scope.parsedProducts.sort();
      }
    };

    /** LOAD **/
    $scope.loadProducts = function () {
      $scope.unparsedProducts = [];
      $scope.products = [];
      RequestAPI.GET("/products", SubmitResult.submitSuccess(function (response) {
          $scope.unparsedProducts = response.data;
          $scope.parseUnparsedProducts();
        }),
        SubmitResult.submitFailure(), TokenManager.get());
    };

    $scope.loadParser = function () {
      $scope.types = [];
      $scope.type = {id: -1, name: "All"};
      $scope.filter = {"price": "UP", "bestPrice": true, "name": true};

      RequestAPI.GET("/types", SubmitResult.submitSuccess(function (response) {
          $scope.types = response.data;
          $scope.types.splice(0, 0, {name: "All", id: -1});
          $scope.type = $scope.types[0];
        }),
        SubmitResult.submitFailure(), TokenManager.get());
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
