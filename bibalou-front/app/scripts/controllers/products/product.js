'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('ProductCtrl', function ($scope, $routeParams, RequestAPI, SubmitResult, TokenManager) {
    $scope.id = $routeParams.id;
    $scope.comment = {};

    $scope.init = function () {
      RequestAPI.GET("/product/" + $scope.id, SubmitResult.submitSuccess(function (response) {
          $scope.product = response.data;
          RequestAPI.GET("/product/" + $scope.product.id + "/comments", SubmitResult.submitSuccess(function (response) {
              $scope.comments = response.data;
            }),
            SubmitResult.submitFailure(), TokenManager.get());
        }),
        SubmitResult.submitFailure(), TokenManager.get());
    };

    $scope.closeReply = function() {
      $scope.isReplyingToProduct = false;
    };

    $scope.replyToPeople = function() {

    };

    $scope.replyToProduct = function() {
      $scope.isReplyingToProduct = true;
    };

    $scope.sendReply = function() {
      console.log("comment: ", $scope.comment);
      RequestAPI.POST("/product/" + $scope.product.id + "/comment", $scope.comment, SubmitResult.submitSuccess("comment send"),
        SubmitResult.submitFailure(), TokenManager.get());
    };
    $scope.init();
  });
