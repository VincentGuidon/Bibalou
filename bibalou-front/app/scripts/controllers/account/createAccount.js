'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:CreateAccountCtrl
 * @description
 * # CreateAccountCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('CreateAccountCtrl', function ($scope, $location, toaster, User, RequestAPI, SubmitResult) {

    $scope.register = function () {
      console.log("register", $scope.name, $scope.email, $scope.password);
      $scope.data = {
        name: $scope.name,
        email: $scope.email,
        password: $scope.password
      };

      // Create account
      RequestAPI.POST("/register", $scope.data,
        SubmitResult.submitSuccess(function (response) {
          // Connexion
          RequestAPI.POST("/authenticate", $scope.data,
            SubmitResult.submitSuccess(function (response) {
              User.connect(response.data.token);
              $location.path("/");
            }, "Connected"),
            SubmitResult.submitFailure("Connexion Failed"));
        }),
        SubmitResult.submitFailure());
    };
  });
