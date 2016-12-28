'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('MainCtrl', function ($scope, RequestAPI, SubmitResult, User) {

    if (User.getToken() != undefined && User.getId() != undefined) {
      $scope.init = function () {
        RequestAPI.GET("/user/byId", SubmitResult.submitSuccess(function (response) {
            $scope.userName = response.data.user.name;
          }),
          SubmitResult.submitFailure(), {token: User.getToken(), id: User.getId()});
      };

      $scope.init();
    }
  });
