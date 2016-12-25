'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:AllMarketPlacesCtrl
 * @description
 * # AllMarketPlacesCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('AllMarketPlacesCtrl', function ($scope, $timeout, $location, toaster, SubmitResult, RequestAPI, CloneUtilsCustom, User) {

    var parseByName = function () {
      if ($scope.searchMarketPlace && $scope.searchMarketPlace != "") {
        for (var i = 0; i < $scope.marketPlaces.length; ++i) {
          if (!$scope.marketPlaces[i].name.includes($scope.searchMarketPlace)) {
            $scope.marketPlaces.splice(i, 1);
            --i;
          }
        }
      }
    };

    function compareName(a, b) {
      if (a.name < b.name)
        return 1;
      else
        return -1;
    }

    $scope.sortParsedMarketPlaces = function () {
        $scope.marketPlaces.sort(compareName);
    };

    $scope.parseUnparsedMarketPlaces = function () {
      $scope.marketPlaces = CloneUtilsCustom.cloneArray($scope.unparsedMarketPlaces);

      parseByName();
      $scope.sortParsedMarketPlaces();
    };

    $scope.loadMarketPlaces = function () {
      $scope.unparsedMarketPlaces = [];

      RequestAPI.GET("/marketPlaces", SubmitResult.submitSuccess(function (response) {
          $scope.unparsedMarketPlaces = response.data.marketPlaces;
        $scope.parseUnparsedMarketPlaces();
        }),
        SubmitResult.submitFailure(), {token: User.getToken()});
    };

    $scope.init = function () {
      console.log(User.isConnected())
      if (!User.isConnected()) {
        $location.path("/login")
        return;
      }
      $scope.loadMarketPlaces();
    };

    $scope.init();

    // Instantiate these variables outside the watch
    var tempo = 400;
    var tempFilterText = '',
      filterTextTimeout;

    $scope.$watch('searchMarketPlace', function (val) {
      if (filterTextTimeout) {
        $timeout.cancel(filterTextTimeout);
      }
      tempFilterText = val;
      filterTextTimeout = $timeout(function () {
        if (!$scope.searchMarketPlace) {
          return;
        }
        $scope.parseMarketPlaces();
      }, tempo); // delay in ms
    })
  });
