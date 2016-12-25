'use strict';

describe('Controller: EditmarketplaceCtrl', function () {

  // load the controller's module
  beforeEach(module('BibalouApp'));

  var EditmarketplaceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditmarketplaceCtrl = $controller('EditmarketplaceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditmarketplaceCtrl.awesomeThings.length).toBe(3);
  });
});
