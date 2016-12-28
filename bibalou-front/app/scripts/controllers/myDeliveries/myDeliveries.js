'use strict';

/**
 * @ngdoc function
 * @name BibalouApp.controller:MyDeliveriesCtrl
 * @description
 * # MyDeliveriesCtrl
 * Controller of the BibalouApp
 */
angular.module('BibalouApp')
  .controller('MyDeliveriesCtrl', function ($scope, $timeout, $location, RequestAPI, SubmitResult, User, CloneUtilsCustom) {

    var parseById = function () {
      if ($scope.searchDelivery && $scope.searchDelivery != "") {
        for (var i = 0; i < $scope.deliveries.length; ++i) {
          if (!$scope.deliveries[i]._id.includes($scope.searchDelivery)) {
            $scope.deliveries.splice(i, 1);
            --i;
          }
        }
      }
    };

    var parseByPayment = function () {
      if ($scope.payment.name != "All") {
        for (var i = 0; i < $scope.deliveries.length; ++i) {
          if ($scope.deliveries[i].payment.name != $scope.payment.name) {
            $scope.deliveries.splice(i, 1);
            --i;
          }
        }
      }
    };

    var compareDate = function (a, b) {
      return (a.date < b.date);
    };

    $scope.parseUnparsedDeliveries = function () {
      $scope.deliveries = CloneUtilsCustom.cloneArray($scope.orders);

      parseById();
      parseByPayment();
      $scope.sortParsedDeliveries();
    };

    $scope.sortParsedDeliveries = function () {
      $scope.deliveries.sort(compareDate);
    };

    $scope.detail = function(delivery) {
      $location.path("/myDeliveries/" + delivery._id);
    };

    $scope.init = function () {
      $scope.payment = {id: -1, name: "All"};
      RequestAPI.GET("/payments", SubmitResult.submitSuccess(function (response) {
          $scope.payments = response.data.payments;
          $scope.payments.splice(0, 0, {id: -1, name: "All"});
          $scope.payment = $scope.payments[0];
        }),
        SubmitResult.submitFailure(), {token: User.getToken()});

      RequestAPI.GET("/orders/byUser", SubmitResult.submitSuccess(function (response) {
          $scope.orders = response.data.orders;
          $scope.parseUnparsedDeliveries();
        }),
        SubmitResult.submitFailure(), {token: User.getToken(), userId: User.getId()});

    };

    $scope.init();

    // Instantiate these variables outside the watch
    var tempo = 400;
    var tempFilterText = '',
      filterTextTimeout;

    $scope.$watch('searchDelivery', function (val) {
      if (filterTextTimeout) {
        $timeout.cancel(filterTextTimeout);
      }
      tempFilterText = val;
      filterTextTimeout = $timeout(function () {
        if (!$scope.searchDelivery) {
          return;
        }
        $scope.parseUnparsedDeliveries();
      }, tempo); // delay in ms
    })
  });
