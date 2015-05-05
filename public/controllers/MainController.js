(function() {

  var app = angular.module("movieapp");

  // controller
  var cntrl = function MainController($scope,$location,movieSvc,$cookieStore) {
    
  var objData = {request: 0, search: ''};

  // validates cookie
  movieSvc.validateCookie();

  $scope.movieSearch = function(request,search){  
    // pass it along to another controller
    $location.path('/movies/' + request + '/' + search);
   };

   // set defaults
   $scope.data = objData;
 
  }

  app.controller("MainController",cntrl);
}());