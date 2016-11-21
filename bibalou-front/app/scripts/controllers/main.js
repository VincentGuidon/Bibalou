'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('MainCtrl', function ($scope, TokenManager) {

    console.log("Salut: ", TokenManager.get());
  });
