(function(){

	var app = angular.module('movieapp', ['ngRoute','ngCookies']);

 app.config(function($routeProvider){
  $routeProvider
  .when('/index', {
    templateUrl: '/views/search.html',
    controller: 'MainController'
  })
  .when('/movies/:request/:search', {
    templateUrl: '/views/listing.html',
    controller: 'MovieController'
  })
  .when('/movies/:request/', {
    templateUrl: '/views/listing.html',
    controller: 'MovieController'
  })
   .when('/user/login', {
    templateUrl: '/views/login.html',
    controller: 'AuthenticateController'
  })
  .otherwise({redirectTo: '/index'});
});
}());