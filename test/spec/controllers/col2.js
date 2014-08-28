'use strict';

describe('Controller: Col2Ctrl', function () {

  // load the controller's module
  beforeEach(module('draftKitApp'));

  var Col2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Col2Ctrl = $controller('Col2Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
