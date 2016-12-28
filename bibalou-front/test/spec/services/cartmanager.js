'use strict';

describe('Service: CartManager', function () {

  // load the service's module
  beforeEach(module('BibalouApp'));

  // instantiate service
  var cartManager;
  beforeEach(inject(function (_cartManager_) {
    cartManager = _cartManager_;
  }));

  it('should do something', function () {
    expect(!!cartManager).toBe(true);
  });

});
