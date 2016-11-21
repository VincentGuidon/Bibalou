'use strict';

/**
 * @ngdoc directive
 * @name BibalouApp.directive:loginNavbarWidget
 * @description
 * # loginNavbarWidget
 */
angular.module('BibalouApp')
  .directive('loginNavbarWidget', function () {
    return {
      restrict: 'A',
      templateUrl: "views/login/loginNavbarWidget.html",
      controller: "LoginCtrl"
    }
  });
