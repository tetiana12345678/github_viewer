//using Controllers
//
(function(){
  "use strict";
  var app = angular.module('githubViewer');

  var MainController = function(
      $scope, github, $interval, $log,
      $anchorScroll, $location) {

    var onUserComplete = function(data){
      $scope.user = data;
      github.getRepos($scope.user).then(onRepos, onError);
    };

    var onError = function(reason){
      $scope.error = "Some error occured while trying to fetch data";
    };

    var onRepos = function(data){
      $scope.repos = data;
      $location.hash("userDetails");
      $anchorScroll;
    };

    var decrementCountdown = function() {
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    };

    var startCountdown = function() {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    var countdownInterval = null;

    $scope.search = function(username){
      $log.info("Searching for " + username);
      github.getUser(username).then(onUserComplete, onError);
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
    };

    $scope.username = "tetianahogg";
    $scope.message = "Github Viewer here!";
    $scope.repoSortOrder = '-stargazers_count';
    $scope.countdown = 5;
    startCountdown();
  };

  app.controller("MainController", MainController);
})();

