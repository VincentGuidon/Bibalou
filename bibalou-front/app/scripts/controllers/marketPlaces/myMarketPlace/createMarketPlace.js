'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:CreateMarketPlaceCtrl
 * @description
 * # CreateParketPlaceCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('CreateMarketPlaceCtrl', function ($scope, $location, User, RequestAPI, SubmitResult) {
    $scope.isBusy = false;
    $scope.marketPlace = {
      owner: User.getId(),
      name: "",
      description: "",
      productList: [],
      order: [],
      image: ""
    };

    $scope.limitFiles = function($files, max) {
      if ($files.length > max) {
        $files.length = max;
      }
    };

    $scope.create = function () {
      $scope.isBusy = true;
      RequestAPI.POST("/marketPlaces", $scope.marketPlace, SubmitResult.submitSuccess(function (response) {
          $location.url("/myMarketPlace");
        $scope.isBusy = false;
        }),
        SubmitResult.submitFailure(function(response) {
          $scope.isBusy = false;
        },{token: User.getToken()}));
    }
  });
