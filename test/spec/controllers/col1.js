'use strict';

describe('Controller: Col1Ctrl', function () {

  // load the controller's module
  beforeEach(module('draftKitApp'));

  var Col1Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Col1Ctrl = $controller('Col1Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
