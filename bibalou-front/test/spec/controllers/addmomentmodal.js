'use strict';

describe('Controller: AddproductmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('BibalouApp'));

  var AddproductmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddproductmodalCtrl = $controller('AddproductmodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddproductmodalCtrl.awesomeThings.length).toBe(3);
  });
});
