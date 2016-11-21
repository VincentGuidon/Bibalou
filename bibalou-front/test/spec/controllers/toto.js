'use strict';

describe('Controller: TotoCtrl', function () {

  // load the controller's module
  beforeEach(module('BibalouApp'));

  var TotoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TotoCtrl = $controller('TotoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TotoCtrl.awesomeThings.length).toBe(3);
  });
});
