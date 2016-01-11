
// now need to access firebase data in our controllers 
// so add firebase as a dependency here too
// get firebase data as an object or an array or asking for the auth data
// in this setup I'm using the auth by $firebaseAuth


// as the app grows - probably want to use auth data in number of different controllers, put the concept of registration in its own service -so we can call whenever we need it  -- angular provides something called factory 


// no longer need $firebaseAuth,a as it will be handled in Authentation
myApp.controller('RegistrationController',['$scope','Authentication',function($scope, Authentication){

	$scope.login = function(){
		// when some one clicks login we get here ..from the login.html that executes login() method 
		// now call the authentication service
		// auth.js has both login and register in that 
		Authentication.login($scope.user);
	}; //login
	//register is the function frmo the register.html page
	// we passing in email and password form the register.html form
	// now after passing how we know we registered (use a promise)
	$scope.register = function(){
		// we passing scope.user to the auth.js file
		Authentication.register($scope.user);	
	};

}]); //controller