'use strict';

describe('Controller: ManagempproductCtrl', function () {

  // load the controller's module
  beforeEach(module('BibalouApp'));

  var ManagempproductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManagempproductCtrl = $controller('ManagempproductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManagempproductCtrl.awesomeThings.length).toBe(3);
  });
});
