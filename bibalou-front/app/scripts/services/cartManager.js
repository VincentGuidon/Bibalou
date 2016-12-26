'use strict';

/**
 * @ngdoc service
 * @name BibalouApp.CartManager
 * @description
 * # CartManager
 * Factory in the BibalouApp.
 */
angular.module('BibalouApp')
  .factory('CartManager', function ($cookies) {
    // Service logic
    var products = [];

    var searchInCookies = function () {
      var values = $cookies.get("products");

      if (values == null) {
        return [];
      }
      return JSON.parse(values);
    };

    var save = function () {
      $cookies.put("products", JSON.stringify(products));
    };

    var addProduct = function (product, quantity) {
      for (var i = 0; i < products.length; ++i) {
        if (products[i].product._id == product._id) {
          products[i].quantity += quantity;
          save();
          return;
        }
      }
      products.push({quantity: quantity, product: product});
      save();
    };

    var removeProduct = function (id) {
      for (var i = 0; i < products.length; ++i) {
        if (products[i].product._id == id) {
          products.splice(i, 1);
          save();
          break;
        }
      }
    };

    var editProduct = function (id, quantity) {
      for (var i = 0; i < products.length; ++i) {
        if (products[i].product._id == id) {
          products[i].quantity = quantity;
          save();
          break;
        }
      }
    };

    // Public API here
    return {
      getProducts: function () {
        if (products.length == 0) {
          return searchInCookies();
        } else {
          return products;
        }
      },
      addProduct: function (product, quantity) {
        addProduct(product, quantity);
      },
      rmProduct: function (id) {
        removeProduct(id);
      },
      editProduct: function (id, quantity) {
        editProduct(id, quantity);
      },
      getPrice: function () {
        var total = 0;

        for (var i = 0; i < products.length; ++i) {
          var price = products[i].product.price;

          if (products[i].product.promotion) {
            price -= products[i].product.promotion.brut;
            price -= (price * products[i].product.promotion.percent / 100);
          }
          total += (products[i].quantity * price);
        }
        return total;
      },
      clear: function () {
        products.length = 0;
        $cookies.remove("products");
      }
    };
  });
