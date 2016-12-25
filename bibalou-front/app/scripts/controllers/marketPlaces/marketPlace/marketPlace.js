'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:MarketPlaceCtrl
 * @description
 * # MarketPlaceCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('MarketPlaceCtrl', function ($scope, $routeParams, RequestAPI, SubmitResult, User) {
    $scope.id = $routeParams.id;

    $scope.init = function() {
      RequestAPI.GET("/marketPlace/" + $scope.id, SubmitResult.submitSuccess(function (response) {
          $scope.marketPlace = response.data.marketPlace;
        }),
        SubmitResult.submitFailure(), {token: User.getToken()});
    };

    $scope.init();
  });
