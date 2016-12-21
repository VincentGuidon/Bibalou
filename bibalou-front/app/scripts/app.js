'use strict';

/**
 * @ngdoc overview
 * @name BibalouApp
 * @description
 * # BibalouApp
 *
 * Main module of the application.
 */
angular
  .module('BibalouApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'flow',
    'toaster',
    'angularFileUpload',
    'selector'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/createAccount', {
        templateUrl: 'views/account/createAccount.html',
        controller: 'CreateAccountCtrl',
        controllerAs: 'createAccount'
      })
      .when('/myAccount', {
        templateUrl: 'views/account/myAccount.html',
        controller: 'MyAccountCtrl',
        controllerAs: 'myAccount'
      })
      .when('/allProducts', {
        templateUrl: 'views/products/allProducts.html',
        controller: 'AllProductsCtrl',
        controllerAs: 'allProducts'
      })
      .when('/product/:id', {
        templateUrl: 'views/products/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'product'
      })
      .when('/allMarketPlaces', {
        templateUrl: 'views/marketPlaces/allMarketPlaces.html',
        controller: 'AllMarketPlacesCtrl',
        controllerAs: 'allMarketPlaces'
      })
      .when('/myMarketPlace', {
        templateUrl: 'views/marketPlaces/myMarketPlace.html',
        controller: 'MyMarketPlaceCtrl',
        controllerAs: 'myMarketPlace'
      })
      .when('/marketPlace/:id', {
        templateUrl: 'views/marketPlaces/marketPlace.html',
        controller: 'MarketPlaceCtrl',
        controllerAs: 'marketPlace'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
