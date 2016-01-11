// start working on the factory  to take care of authentication service

myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', 'FIREBASE_URL', function($rootScope, $firebaseAuth, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	return {
		login: function(user){
			$rootScope.message = "Welcome "+ user.email;			
		}, //login



		register: function(user){
			
			auth.$createUser({
			email:user.email,
			password:user.password
			}).then(function(regUser) {
			$rootScope.message = "Hi "+ user.firstname + ", Thanks for registering";
			}).catch(function(error){   // if it fails (user tries to register email more than once ) , we gonna get error from firebase, that error has a parameter of message (default)
			$rootScope.message = error.message;
			}); // create user 
		}	// register function
	};
}]); //factory
