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

    $scope.isBusy = false;

    $scope.register = function () {
      $scope.data = {
        name: $scope.name,
        email: $scope.email,
        password: $scope.password
      };

      // Create account
      $scope.isBusy = true;
      RequestAPI.POST("/authenticate/register", $scope.data,
        SubmitResult.submitSuccess(function (response) {
          // Connexion
          RequestAPI.POST("/authenticate/auth", $scope.data,
            SubmitResult.submitSuccess(function (response) {
              User.connect(response.data.token);
              $location.path("/");
              $scope.isBusy = false;
            }, "Connected"),
            SubmitResult.submitFailure("Connexion Failed"));
        }),
        SubmitResult.submitFailure(function(response) {
          $scope.isBusy = false;
        }));
    };
  });
