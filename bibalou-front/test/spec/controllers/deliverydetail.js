'use strict';

describe('Controller: DeliverydetailCtrl', function () {

  // load the controller's module
  beforeEach(module('BibalouApp'));

  var DeliverydetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeliverydetailCtrl = $controller('DeliverydetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DeliverydetailCtrl.awesomeThings.length).toBe(3);
  });
});
