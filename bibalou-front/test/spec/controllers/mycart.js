'use strict';

describe('Controller: MycartCtrl', function () {

  // load the controller's module
  beforeEach(module('BibalouApp'));

  var MycartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MycartCtrl = $controller('MycartCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MycartCtrl.awesomeThings.length).toBe(3);
  });
});
