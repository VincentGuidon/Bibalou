'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:AllMarketPlacesCtrl
 * @description
 * # AllMarketPlacesCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('AllMarketPlacesCtrl', function ($scope, toaster, SubmitResult, RequestAPI, TokenManager) {

    $scope.init = function () {
      RequestAPI.GET("/marketPlaces", SubmitResult.submitSuccess(function (response) {
          $scope.marketPlaces = response.data;
        }),
        SubmitResult.submitFailure(), TokenManager.get());
    };

    $scope.init();
  });
