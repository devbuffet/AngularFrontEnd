(function() {

	var app = angular.module("movieapp");

  	// controller
  	var cntrl = function LogOutController($scope,$cookieStore,$location) {

    // logs user out
  	$scope.logout = function logout(){  
    // remove cookie
    $cookieStore.remove('movieUser');
    // redirect to login...
      $location.path('/user/login');
    };
	}

	app.controller("LogOutController",cntrl);
}());