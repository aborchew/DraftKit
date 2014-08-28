'use strict';

angular.module('draftKitApp')
  .controller('Col1Ctrl', function ($scope) {
    $scope.tabs = {
      'available': {
        'active': true
      },
      'teams': {
        'active': false,
        'current': 'index'
      },
      'drafted': {
        'active': false
      },
      'starred': {
        'active': false
      }
    }
  });
