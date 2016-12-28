'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:MarketPlaceCtrl
 * @description
 * # MarketPlaceCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('MarketPlaceCtrl', function ($scope, $location, $routeParams, toaster, User, SubmitResult, RequestAPI) {
    $scope.busy = true;
    $scope.mode = 0;

    $scope.changeMode = function (value) {
      $scope.mode = value;
    };

    $scope.parseNews = function () {
      var newNews = [];
      for (var i = 0; i < $scope.marketPlace.news.length; ++i) {
        newNews.push(JSON.parse($scope.marketPlace.news[i]));
      }
      $scope.marketPlace.news = newNews;
    };

    $scope.init = function () {
      RequestAPI.GET("/marketPlaces/byName", SubmitResult.submitSuccess(function (response) {
          $scope.marketPlace = response.data.marketPlace;
          $scope.parseNews();
          $scope.busy = false;
        }),
        SubmitResult.submitFailure(function () {
        }), {token: User.getToken(), name: $routeParams.name});
    };

    $scope.init();
  });
