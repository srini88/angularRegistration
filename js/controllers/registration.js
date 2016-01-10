
// now need to access firebase data in our controllers 
// so add firebase as a dependency here too
// get firebase data as an object or an array or asking for the auth data
// in this setup I'm using the auth by $firebaseAuth
myApp.controller('RegistrationController',['$scope','$firebaseAuth', 'FIREBASE_URL',function($scope, $firebaseAuth, FIREBASE_URL){


	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	$scope.login = function(){
		// this message will be printed from the login.html page
		$scope.message = "Welcome "+ $scope.user.email;
	};
	//register is the function frmo the register.html page
	// we passing in email and password form the register.html form
	// now after passing how we know we registered (use a promise)
	$scope.register = function(){
		auth.$createUser({
			email:$scope.user.email,
			password:$scope.user.password
		}).then(function(regUser){
			$scope.message = "Hi "+ $scope.user.firstname + ", Thanks for registering";
		}).catch(function(error){   // if it fails (user tries to register email more than once ) , we gonna get error from firebase, that error has a parameter of message (default)
			$scope.message = error.message;
		}); // create user 
	};  // register 

}]); //controller