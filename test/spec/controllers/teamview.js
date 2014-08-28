'use strict';

describe('Controller: TeamviewCtrl', function () {

  // load the controller's module
  beforeEach(module('draftKitApp'));

  var TeamviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TeamviewCtrl = $controller('TeamviewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
