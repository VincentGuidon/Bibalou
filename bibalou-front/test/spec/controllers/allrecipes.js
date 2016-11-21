'use strict';

describe('Controller: AllmarketPlacesCtrl', function () {

  // load the controller's module
  beforeEach(module('BibalouApp'));

  var AllmarketPlacesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AllmarketPlacesCtrl = $controller('AllmarketPlacesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AllmarketPlacesCtrl.awesomeThings.length).toBe(3);
  });
});
