'use strict';

describe('Controller: CreatemarketplaceCtrl', function () {

  // load the controller's module
  beforeEach(module('BibalouApp'));

  var CreatemarketplaceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatemarketplaceCtrl = $controller('CreatemarketplaceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreatemarketplaceCtrl.awesomeThings.length).toBe(3);
  });
});
