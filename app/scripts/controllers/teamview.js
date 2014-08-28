'use strict';

angular.module('draftKitApp')
  .controller('TeamviewCtrl', function ($scope, $filter) {

    $scope.getCount = function(count) {
      return new Array(count);
    }

    var getDisplayRoster = function (roster) {

      var placed = [];

      angular.forEach($scope.setup.roster, function (count, pos) {

        angular.forEach(roster, function (player) {

          if(player.position == pos) {

            if($filter('filter')(placed, {pos: pos}).length < count) {
              placed[placed.length] = {
                pos: pos,
                player: player
              }
              return;
            }

          } else if(pos === 'Flex' && count > 0 && $filter('filter')(placed, {pos: 'Flex'}).length < $scope.setup.roster['Flex']) {

            var playerIsEligible = $scope.setup.flexEligibility.indexOf(player.position) != -1;

            if(playerIsEligible) {

              angular.forEach(roster, function (globalPlayer) {
                var addMe = true;
                angular.forEach(placed, function (localPlayer) {
                  if(angular.equals(globalPlayer, localPlayer.player)) {
                    addMe = false;
                  }
                })

                if(addMe) {
                  placed[placed.length] = {
                    pos: 'Flex',
                    player: globalPlayer
                  }
                }

              });

            }

          }

        });

        var placedCountAtPosition = $filter('filter')(placed, {pos: pos}).length;

          if(placedCountAtPosition < count && pos !== 'BNCH') {
            while(placedCountAtPosition < count) {
              placed[placed.length] = {
                pos: pos,
                player: undefined
              }
              placedCountAtPosition += 1;
            }
          }

      });

      angular.forEach(roster, function (globalPlayer) {
        var addMe = true;
        angular.forEach(placed, function (localPlayer) {
          if(angular.equals(globalPlayer, localPlayer.player)) {
            addMe = false;
          }
        })

        if(addMe) {
          placed[placed.length] = {
            pos: 'BNCH',
            player: globalPlayer
          }
        }

      });

      angular.forEach($scope.setup.roster, function (count, pos) {

        var placedCountAtPosition = $filter('filter')(placed, {pos: pos}).length;

        if(placedCountAtPosition < count) {
          while(placedCountAtPosition < count) {
            placed[placed.length] = {
              pos: pos,
              player: undefined
            }
            placedCountAtPosition += 1;
          }
        }

      });

      return placed;

    }

    $scope.$watch(function () {
      return $scope.drafted;
    }, function (roster) {
      $scope.roster = getDisplayRoster($scope.getRoster());
    }, true)

  });
