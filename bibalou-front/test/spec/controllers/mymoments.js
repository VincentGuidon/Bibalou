'use strict';

describe('Controller: MyproductsCtrl', function () {

  // load the controller's module
  beforeEach(module('BibalouApp'));

  var MyproductsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyproductsCtrl = $controller('MyproductsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MyproductsCtrl.awesomeThings.length).toBe(3);
  });
});
