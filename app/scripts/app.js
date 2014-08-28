'use strict';

angular
  .module('draftKitApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angucomplete-alt',
    'ui.sortable',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          rankings: function ($q, $http) {
            var def = $q.defer();

            $http.get('/scripts/json/rankings.json')
              .success(function (data) {
                def.resolve(data);
              })

            return def.promise;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
