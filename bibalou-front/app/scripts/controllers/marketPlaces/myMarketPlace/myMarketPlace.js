'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:MyMarketPlaceCtrl
 * @description
 * # MyMarketPlaceCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('MyMarketPlaceCtrl', function ($scope, $location, toaster, User, SubmitResult, RequestAPI) {
    $scope.busy = true;
    $scope.mode = 1;

    $scope.changeMode = function (value) {
      $scope.mode = value;
    };

    $scope.parseNews = function () {
      var newNews = [];
      for (var i = 0; i < $scope.marketPlace.news.length; ++i) {
        newNews.push(JSON.parse($scope.marketPlace.news[i]));
      }
      $scope.marketPlace.news = newNews;
      console.log($scope.marketPlace.news);
    };

    $scope.init = function () {
      console.log("init");
      RequestAPI.GET("/marketPlaces/byOwner", SubmitResult.submitSuccess(function (response) {
          $scope.marketPlace = response.data.marketPlace;
          $scope.parseNews();
          $scope.busy = false;
        }),
        SubmitResult.submitFailure(function () {
          $location.url("/myMarketPlace/edit");
        }), {token: User.getToken(), owner: User.getId()});
    };

    $scope.edit = function () {
      $location.url("/myMarketPlace/edit");
    };

    $scope.init();
  });
