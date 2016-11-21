'use strict';

describe('Controller: MarketPlaceCtrl', function () {

  // load the controller's module
  beforeEach(module('BibalouApp'));

  var MarketPlaceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MarketPlaceCtrl = $controller('MarketPlaceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MarketPlaceCtrl.awesomeThings.length).toBe(3);
  });
});
