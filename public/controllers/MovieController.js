	(function() {

	   var app = angular.module("movieapp");

	   // controller
	   var cntrl = function MovieController($scope, movieSvc,$routeParams,$cookies) {

	   var objData = {message: null, progress: null, 
	   				  request: null, search: null, indx: null,
	   				  objMovie: null
	   				 };

	   // validates cookie
	   movieSvc.validateCookie();

	   // get movie data
	   var onMovieSearchComplete = function(data) {

	   objData.objMovie = data;
       // adjust progress
	   objData.progress = data.length + ' results found for ' + ($routeParams.search == undefined ? '*' : $routeParams.search);
	   $scope.data = objData;

	};

	var onError = function(reason) {
		objData.message = reason;
    	$scope.data = objData;	   
	}; 

	  // get movie data
	  var onMoviemovieLookupComplete = function(data) {
	   	// clear please wait...
	   	objData.objMovie[objData.indx].status = null;
	 
	   	// store data
	   	objData.objMovie[objData.indx].links= data;

	   	$scope.data = objData;

	   };

	   $scope.movieLookup = function(indx){

	  	// track index
	  	objData.indx = indx; 
	  	objData.objMovie[indx].status = "please wait...";
	  	$scope.data = objData;	

      	//get user and when complete fill scope object
      	movieSvc.getMovie(objData.objMovie[indx].href)
      	.then(onMoviemovieLookupComplete, onError);

      };

       objData.request = $routeParams.request;

	   // this could be empty
	   objData.search = (typeof($routeParams.search) == 'undefined' ? '' : $routeParams.search);

	   // show progress 
	   objData.progress = "searching...";
	   $scope.data = objData;

	   // get user and when complete fill scope object
	   movieSvc.getMovies(objData.request, objData.search)
	   .then(onMovieSearchComplete, onError);
	}

	app.controller("MovieController",cntrl);

})();