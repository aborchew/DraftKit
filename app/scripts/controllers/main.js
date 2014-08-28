'use strict';

angular.module('draftKitApp')
  .controller('MainCtrl', function ($rootScope, $scope, $timeout, $filter, rankings) {

    $scope.setup = {
      rounds: 15,
      teams: 12,
      snaking: true,
      roster: {
        'QB': 1,
        'WR': 2,
        'RB': 2,
        'TE': 1,
        'Flex': 1,
        'DST': 1,
        'K': 1,
        'BNCH': 5
      },
      flexEligibility: ['WR', 'RB', 'TE']
    }

    $scope.rankings = rankings;
    $scope.drafted = [];
    $scope.rounds = [];
    $scope.teams = [];
    $scope.consumableRoster = [];

    $scope.comparator = 'aveRank';
    $scope.reverse = false;
    $scope.playerListExpanded = false;

    for(var i = 0; i < $scope.setup.rounds; i++) {
      var blankRound = {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
        10: null,
        11: null
      }
      $scope.rounds.push(blankRound);
    }

    for(var i = 0; i < $scope.setup.teams; i++) {
      var blankTeam = {
        'name': 'Player ' + (i+1),
        'id': i
      }
      $scope.teams.push(blankTeam);
    }

    $scope.draft = function () {
      var drafted = this.player;
      angular.forEach($scope.rankings, function (player, i) {
        if(angular.equals(drafted, player)) {
          $scope.drafted.push($scope.rankings.splice(i,1)[0]);
          $timeout(function () {
            var fantasyTeam = $scope.drafted[$scope.drafted.length-1].draftPosition % $scope.setup.teams;
            if($scope.setup.snaking && $scope.getRound(player.draftPosition) % 2 == 0) {
              fantasyTeam = $scope.setup.teams - fantasyTeam - 1;
            }
            $scope.drafted[$scope.drafted.length-1].fantasyTeam = fantasyTeam;
          }, 0);
          return;
        }
      })
    }

    $scope.undraft = function () {
      var drafted = this.player;
      angular.forEach($scope.drafted, function (player, i) {
        if(angular.equals(drafted, player)) {
          $scope.rankings.push($scope.drafted.splice(i,1)[0]);
        }
      })
    }

    $scope.getRound = function (pos) {
      return pos % $scope.setup.teams != 0 ? Math.ceil(pos/$scope.setup.teams) : Math.ceil(pos/$scope.setup.teams) + 1;
    }

    $scope.favorite = function () {
      this.player.favorite = !this.player.favorite;
    }

    $rootScope.getFantasyTeam = function () {
      return $filter('filter')($scope.teams, {'id': this.player.fantasyTeam})[0];
    }

    $scope.getRoster = function (pos) {

      var teamId = this.team.id;

      var roster = $filter('filter')($scope.drafted, function (player) {
        if(pos) {
          return player.fantasyTeam === teamId && player.position === pos;
        } else {
          return player.fantasyTeam === teamId;
        }
      });

      return roster;

    }

    $scope.$watch(function () {
      return $scope.drafted;
    }, function () {
      angular.forEach($scope.drafted, function (player, index) {
        player.draftPosition = index;
      })
      // console.clear();
      // console.log(angular.toJson($scope.drafted, true))
    }, true);

  });
