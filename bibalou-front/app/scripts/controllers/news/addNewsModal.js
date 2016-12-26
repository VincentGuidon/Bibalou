'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:AddNewsModalCtrl
 * @description
 * # AddNewsModalCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('AddNewsModalCtrl', function ($scope, $uibModalInstance, RequestAPI, SubmitResult, User, Parent) {

    $scope.isBusy = false;
    $scope.current = 1;
    $scope.mode = [
      {title: "Edit News", btnCancel: {title: "Clear", action: clear}, btnValid: {title: "Save", action: edit}},
      {
        title: "Create a News",
        btnCancel: {title: "Cancel", action: exit},
        btnValid: {title: "Create", action: create}
      }
    ];
    $scope.news = {
      title: "",
      description: ""
    };

    function clear() {
      fillNews();
    }

    function exit() {
      $scope.quit();
    }

    function edit() {
      $scope.isBusy = true;
      RequestAPI.PUT("/marketPlaces/editNews", {idMarket: Parent.marketPlace._id, value: $scope.news}, SubmitResult.submitSuccess(function (response) {
          $scope.isBusy = false;
          $scope.quit();
        }),
        SubmitResult.submitFailure(function (response) {
          $scope.isBusy = false;
        }, {token: User.getToken()}));
    }

    function create() {
      $scope.isBusy = true;
      RequestAPI.PUT("/marketPlaces/addNews", {idMarket: Parent.marketPlace._id, value: $scope.news}, SubmitResult.submitSuccess(function (response) {
          $scope.isBusy = false;
          $scope.quit();
        }),
        SubmitResult.submitFailure(function (response) {
          $scope.isBusy = false;
        }, {token: User.getToken()}));
    }

    function fillNews() {
      $scope.news.content = $scope.newsSave.content;
      $scope.news.title = $scope.newsSave.title;
      $scope.news.id = $scope.newsSave.id;
    }

    $scope.quit = function () {
      Parent.finishAction();
      $uibModalInstance.dismiss('cancel');
    };

    $scope.init = function () {
      if (Parent.news) {
        $scope.newsSave = Parent.news;
        $scope.current = 0;
        fillNews();
      } else {
        $scope.current = 1;
      }
    };

    $scope.init();
  });
