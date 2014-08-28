'use strict';

angular.module('draftKitApp')
  .controller('Col2Ctrl', function ($scope) {
    $scope.tabs = {
      'available': {
        'active': false
      },
      'drafted': {
        'active': true
      },
      'teams': {
        'active': false,
        'current': 'index'
      },
      'starred': {
        'active': false
      }
    }
  });
