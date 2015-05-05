(function() {

  var app = angular.module("movieapp");

  // controller
  var cntrl = function MainController($scope,$location,movieSvc,$cookieStore) {
    
  // validates cookie
  movieSvc.validateCookie();

  $scope.movieSearch = function(request,search){  
    // pass it along to another controller
    $location.path('/movies/' + request + '/' + search);
   };

   // set defaults
   $scope.request = 0;
   $scope.search = '';
 
  }

  app.controller("MainController",cntrl);
}());