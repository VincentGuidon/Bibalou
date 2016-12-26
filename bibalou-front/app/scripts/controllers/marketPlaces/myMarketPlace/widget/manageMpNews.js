'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:ManageMpNewsCtrl
 * @description
 * # ManageMpNewsCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('ManageMpNewsCtrl', function ($scope, $timeout, $uibModal, toaster, SubmitResult, RequestAPI, User, CloneUtilsCustom) {
    $scope.datePickerForDate = {};

    $scope.datePickerForDate.status = {
      opened: false
    };

    $scope.datePickerForDateOpen = function($event) {
      $scope.datePickerForDate.status.opened = true;
    };

    var compareDate = function(a, b) {
      return (a.date < b.date);
    };

    var parseByTitle = function() {
      if ($scope.searchNews && $scope.searchNews != "") {
        console.log("parse: ", $scope.searchNews);
        for (var i = 0; i < $scope.news.length; ++i) {
          if (!$scope.news[i].title.includes($scope.searchNews)) {
            $scope.news.splice(i, 1);
            --i;
          }
        }
      }
    };

    var parseByDate = function() {
      if ($scope.date && $scope.date != "") {
        for (var i = 0; i < $scope.news.length; ++i) {
          var current = new Date($scope.news[i].date.toString());
          if ($scope.date.toString().substring(0, 11) !== current.toString().substring(0, 11)) {
            $scope.news.splice(i, 1);
            --i;
          }
        }
      }
    };

    $scope.parseUnparsedNews = function () {
      $scope.news = CloneUtilsCustom.cloneArray($scope.marketPlace.news);
      console.log($scope.news);


      parseByTitle();
      parseByDate();
      $scope.sortParsedNews();
    };

    $scope.sortParsedNews = function () {
        $scope.news.sort(compareDate);
    };

    /** FUNCTION **/

    $scope.addNews = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/news/addNewsModal.html',
        controller: 'AddNewsModalCtrl',
        size: 'lg',
        resolve: {
          Parent: function () {
            return {news: null, marketPlace: $scope.marketPlace, finishAction: $scope.reloadNews};
          }
        }
      });
    };

    $scope.editNews = function (news) {/*
      var modalInstance = $uibModal.open({
        templateUrl: 'views/news/addNewsModal.html',
        controller: 'AddNewsModalCtrl',
        size: 'lg',
        resolve: {
          Parent: function () {
            return {news: news, marketPlace: $scope.marketPlace, finishAction: $scope.reloadNews};
          }
        }
      });*/
    };

    $scope.delete = function (id) {/*
      RequestAPI.DELETE("/marketPlaces/removeNews", {idMarket: $scope.marketPlace._id, idNews: id}, SubmitResult.submitSuccess(function (response) {
          $scope.reloadNews();
        }),
        SubmitResult.submitFailure(), {token: User.getToken(), id: id});*/
    };

    /** LOAD **/
    $scope.loadNews = function () {
      $scope.parseUnparsedNews();
    };

    $scope.reloadNews = function () {
      RequestAPI.GET("/marketPlaces/byId/news", SubmitResult.submitSuccess(function (response) {
          $scope.marketPlace.news = response.data.news;
          $scope.parseNews();
          $scope.busy = false;
          $scope.loadNews();
        }),
        SubmitResult.submitFailure(function () {
        }), {token: User.getToken(), id: $scope.marketPlace._id});
    };

    $scope.initMpNews = function () {
      $scope.loadNews();
    };

    $scope.initMpNews();

    // Instantiate these variables outside the watch
    var tempo = 400;
    var tempFilterText = '',
      filterTextTimeout;

    $scope.$watch('searchNews', function (val) {
      if (filterTextTimeout) {
        $timeout.cancel(filterTextTimeout);
      }
      tempFilterText = val;
      filterTextTimeout = $timeout(function () {
        console.log("toto");
        if (!$scope.searchNews) {
          return;
        }
        $scope.parseUnparsedNews();
      }, tempo); // delay in ms
    })
  });
