(function() {

	var app = angular.module("movieapp");

  	// controller
  	var cntrl = function AuthenticateController($scope,movieSvc,$cookieStore,$location) {

  	var objData = {message: null};

  	// validate login
  	$scope.validateLogin = function(email, password)
  	{
    	// give user a status...
    	objData.message = 'please wait...';
    	$scope.data = objData;

    	//validate user
    	movieSvc.authUser(email,password)
    	.then(onauthUserComplete, onError);
    };

    var onError = function(reason) {
    	objData.message = reason;
    	$scope.data = objData;	   	
    }; 

	   // process data
	   var onauthUserComplete = function(data) {

	   	// valid?
	   	if(data[0])
	   	{
	   		// store cookie
	   		$cookieStore.put('movieUser',$scope.email + ',' + $scope.password);
	   		
		   	// redirect to main...
		   	$location.path('/index');
		   }
		   else
		   {
	   		// report error
	   		objData.message = 'invalid login...try again!';
	   		$scope.data = objData;	   		
	   	}
	   };
	}

	app.controller("AuthenticateController",cntrl);
}());