'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:AddproductmodalCtrl
 * @description
 * # AddproductmodalCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('AddProductModalCtrl', function ($scope, $uibModalInstance, RequestAPI, SubmitResult, User, FileUploader) {
    $scope.flow = {};

    $scope.save = function () {
      /*
      console.log("images: ", $scope.flow);
      RequestAPI.POST("/upload", $scope.flow.content.files[0].file, SubmitResult.submitSuccess(function (response) {
          console.log("YEAH: ", response);
        }),
        SubmitResult.submitFailure(), TokenManager.get());
      */
       RequestAPI.POST("/product", $scope.product, SubmitResult.submitSuccess(function (response) {
       $scope.init();
       $scope.clear();
       }, "Product created"),
       SubmitResult.submitFailure(), {token: User.getToken()});
    };

    $scope.uploader = new FileUploader();

    $scope.checkImg = function() {
      console.log("draw: ", $scope.img);
    };

    $scope.clear = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
