'use strict';

describe('Controller: MyMarketPlaceCtrl', function () {

  // load the controller's module
  beforeEach(module('BibalouApp'));

  var MyMarketPlaceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyMarketPlaceCtrl = $controller('MyMarketPlaceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MyMarketPlaceCtrl.awesomeThings.length).toBe(3);
  });
});
