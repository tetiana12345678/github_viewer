//using Controllers
//
(function(){
  "use strict";
  var app = angular.module('githubViewer');

  var UserController = function($scope, github, $routeParams) {

    var onUserComplete = function(data){
      $scope.user = data;
      github.getRepos($scope.user).then(onRepos, onError);
    };

    var onError = function(reason){
      $scope.error = "Some error occured while trying to fetch data";
    };

    var onRepos = function(data){
      $scope.repos = data;
    };

    $scope.username = $routeParams.username;
    $scope.repoSortOrder = '-stargazers_count';
    github.getUser($scope.username).then(onUserComplete, onError);
  };

  app.controller("UserController", UserController);
})();

