'use strict';

describe('Controller: ModifyplayerfantasyteamCtrl', function () {

  // load the controller's module
  beforeEach(module('draftKitApp'));

  var ModifyplayerfantasyteamCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModifyplayerfantasyteamCtrl = $controller('ModifyplayerfantasyteamCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
