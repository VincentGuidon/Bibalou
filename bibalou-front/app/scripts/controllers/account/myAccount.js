'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:MyAccountCtrl
 * @description
 * # MyAccountCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('MyAccountCtrl', function ($scope, toaster, User, SubmitResult, RequestAPI, CloneUtilsCustom) {
    $scope.change = {};

    $scope.initChanges = function () {
      CloneUtilsCustom.copyObject($scope.user, $scope.change);
      $scope.change.passwordVerif = "";
    };

    $scope.init = function () {
      RequestAPI.GET("/user/byId", SubmitResult.submitSuccess(function (response) {
          $scope.user = response.data.user;
        console.log($scope.user);
          $scope.initChanges();
        }),
        SubmitResult.submitFailure(), {token : User.getToken(), id: User.getId()});
    };

    var checkChanges = function () {

      //check password
      if ($scope.change.password != $scope.change.passwordVerif) {
        swal({
          title: "Error!",
          text: "password are not equals",
          type: "error",
          confirmButtonText: "OK"
        });
        return false;
      }
      return true;
    };

    $scope.saveChanges = function () {
      if (checkChanges() == false) {
        return;
      }
      CloneUtilsCustom.copyObject($scope.change, $scope.user);
      delete $scope.user.passwordVerif;
      RequestAPI.PUT("/user", $scope.user, SubmitResult.submitSuccess(function (response) {
          $scope.initChanges();
        }, "Profile updated !"),
        SubmitResult.submitFailure(), {token: User.getToken()});
    };

    $scope.cancelChanges = function () {
      $scope.initChanges();
    };

    $scope.init();
  });
