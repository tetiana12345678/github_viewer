//using Controllers
//
(function(){
  "use strict";
  var app = angular.module('githubViewer',[]);

  var MainController = function($scope, $http, $interval, $log) {
    var onUserComplete = function(response){
      $scope.user = response.data;
      $http.get($scope.user.repos_url)
        .then(onRepos, onError);
    };

    var onError = function(reason){
      $scope.error = "Some error occured while trying to fetch data";
    };

    var onRepos = function(response){
      $scope.repos = response.data;
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
      $http.get("https://api.github.com/users/" + username)
        .then(onUserComplete, onError);
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

