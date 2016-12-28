'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:EditMarketPlaceCtrl
 * @description
 * # EditMarketPlaceCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('EditMarketPlaceCtrl', function ($scope, $routeParams, $location, User, RequestAPI, SubmitResult) {
    $scope.isBusy = false;
    $scope.current = 1;
    $scope.marketPlace = {
      owner: User.getId(),
      name: "",
      description: "",
      image: ""
    };

    $scope.mode = [
      {title: "Edit your MarketPlace", btnCancel: {title: "Clear", action: clear}, btnValid: {title: "Save", action: edit}},
      {title: "Create your MarketPlace", btnCancel: {title: "Cancel", action: exit}, btnValid: {title: "Create", action: create}}
    ];


    /** TOOLS **/

    $scope.back = function() {
      $location.path("/myMarketPlace");
    };

    function clear() {
      fillMarket();
    }

    function exit() {
      $location.path("/");
    }

    function edit() {
      $scope.isBusy = true;
      RequestAPI.PUT("/marketPlaces", $scope.marketPlace, SubmitResult.submitSuccess(function (response) {
          $scope.isBusy = false;
          $scope.back();
        }),
        SubmitResult.submitFailure(function (response) {
          $scope.isBusy = false;
        }, {token: User.getToken()}));
    }

    function create () {
      $scope.isBusy = true;
      RequestAPI.POST("/marketPlaces", $scope.marketPlace, SubmitResult.submitSuccess(function (response) {
          $scope.isBusy = false;
          $scope.back();
        }),
        SubmitResult.submitFailure(function (response) {
          $scope.isBusy = false;
        }, {token: User.getToken()}));
    }

    $scope.limitFiles = function ($files, max) {
      if ($files.length > max) {
        $files.length = max;
      }
    };

    function fillMarket() {
      $scope.marketPlace.name = $scope.marketPlaceSave.name;
      $scope.marketPlace.description = $scope.marketPlaceSave.description;
      $scope.marketPlace.image = $scope.marketPlaceSave.image;
      $scope.marketPlace._id = $scope.marketPlaceSave._id;
    }

    $scope.init = function () {
      RequestAPI.GET("/marketPlaces/byOwner", SubmitResult.submitSuccess(function (response) {
          $scope.marketPlaceSave = response.data.marketPlace;
          fillMarket();
          $scope.current = 0;
          $scope.busy = false;
        }),
        SubmitResult.submitFailure(function () {
          $scope.current = 1;
          $scope.busy = false;
        }), {token: User.getToken(), owner: User.getId()});
    };

    $scope.init();
  });
