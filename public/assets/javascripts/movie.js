	(function() {

		var baseUrl = 'https://coverapi.herokuapp.com';
		//var baseUrl = 'http://localhost:3000';

		var movieSvc = function($http,$cookieStore,$location)
		{
			// get movies
			var getMovies = function(request,search){
				return	$http.get(baseUrl + "/api/list?request=" + request + "&search=" + search)
							 .then(function(response){
							 	return response.data;
							 });
			
			};

			// gets particular movie
			var getMovie = function(url){
				return	$http.get(baseUrl + "/api/movie?url=" + url)
							 .then(function(response){
							 	return response.data;
							 });
			
			};

			// authenticates user
			var authUser = function(username, password){
				return	$http.get(baseUrl + "/api/auth?username=" + username + "&password=" + password)
							 .then(function(response){
							 	return response.data;
							 });

			};

			// validate cookie
			var validateCookie = function(){
		    	// restrict access if not logged in
   				var cookie_tx = $cookieStore.get('movieUser');

   				// start off with empty array
   				var arrCookie = [null,null];

   				if(cookie_tx != null)
   				{
   					cookie_tx.split(',').forEach(function(item,indx) {
			    	arrCookie[indx] = item;
			    	});
   				}
			   
		      authUser(arrCookie[0],arrCookie[1])
	              .then(function(response)
	                {
	                  if (!response[0])
	                  {
	                    $location.path('/user/login');
	                  }
	                });
			};
			
			return {
				getMovies: getMovies,
				getMovie: getMovie,
				authUser: authUser,
				validateCookie: validateCookie
			};

		};

		var module = angular.module('movieapp');

		module.factory('movieSvc',movieSvc);

	})();