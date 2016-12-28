'use strict';

describe('Controller: MydeliveriesCtrl', function () {

  // load the controller's module
  beforeEach(module('BibalouApp'));

  var MydeliveriesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MydeliveriesCtrl = $controller('MydeliveriesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MydeliveriesCtrl.awesomeThings.length).toBe(3);
  });
});
