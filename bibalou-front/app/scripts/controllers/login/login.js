'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('LoginCtrl', function ($scope, $location, toaster, RequestAPI, User, SubmitResult) {

    $scope.userCtrl = User;
    $scope.data = {};

    $scope.loginPageLocation = function () {
      return $location.path() == "/login";
    };

    $scope.doLogin = function () {
      console.log("login: ", $scope.data.login, $scope.data.password);
      RequestAPI.POST("/authenticate", $scope.data,
        SubmitResult.submitSuccess(function (response) {
          User.connect(response.data.token, response.data.id);
          $location.path("/");
        }, "Connected"),
        SubmitResult.submitFailure("Connexion Failed"));
    };
  });
