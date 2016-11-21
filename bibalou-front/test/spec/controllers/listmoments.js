'use strict';

describe('Controller: ListProductsCtrl', function () {

  // load the controller's module
  beforeEach(module('BibalouApp'));

  var ListProductsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListProductsCtrl = $controller('ListproductsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ListProductsCtrl.awesomeThings.length).toBe(3);
  });
});
