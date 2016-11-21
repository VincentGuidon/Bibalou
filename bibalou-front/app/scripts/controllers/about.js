'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('AboutCtrl', function ($scope, $cookies) {

    $(document).ready(function() {
      $('#Carousel').carousel({
        interval: 5000
      })
    });

    $scope.removeCookies = function () {
      $cookies.remove("userConnected");
      $cookies.remove("token")
    };
  });
