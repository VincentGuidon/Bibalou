'use strict';

describe('Service: tokenManager', function () {

  // load the service's module
  beforeEach(module('BibalouApp'));

  // instantiate service
  var tokenManager;
  beforeEach(inject(function (_tokenManager_) {
    tokenManager = _tokenManager_;
  }));

  it('should do something', function () {
    expect(!!tokenManager).toBe(true);
  });

});
