'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:MarketPlaceCtrl
 * @description
 * # MarketPlaceCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('MarketPlaceCtrl', function ($scope, $routeParams, RequestAPI, SubmitResult, TokenManager) {
    $scope.id = $routeParams.id;

    $scope.init = function() {
      RequestAPI.GET("/marketPlace/" + $scope.id, SubmitResult.submitSuccess(function (response) {
          $scope.marketPlace = response.data;
          RequestAPI.GET("/marketPlace/" + $scope.marketPlace.id + "/comments", SubmitResult.submitSuccess(function (response) {
              $scope.comments = response.data;
            }),
            SubmitResult.submitFailure(), TokenManager.get());
        }),
        SubmitResult.submitFailure(), TokenManager.get());
    };

    $scope.init();
  });
