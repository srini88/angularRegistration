// start working on the factory  to take care of authentication service

myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', 'FIREBASE_URL', function($rootScope, $firebaseAuth, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	// when this factory is called, it is gonna return an object 
	// this object contains different functions , contains login as a method, and register as a method ...controller is gonna be calling this factory 
	return {
		login: function(user){
			$rootScope.message = "Welcome "+ user.email;			
		}, //login



		register: function(user){
			
			auth.$createUser({
			email:user.email,
			password:user.password
			}).then(function(regUser) {

			// now we planning to put data into the firebase database
			// planning to put user's data into some different object in the firebase 

			var regRef = new Firebase(FIREBASE_URL + 'users')
			.child(regUser.uid).set({
				// ask firebase only to give date info
				date: Firebase.ServerValue.TIMESTAMP,
				regUser: regUser.uid,
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email
			}); // add user id as the child of this path , putting user info into firebase 


			$rootScope.message = "Hi "+ user.firstname + ", Thanks for registering";
			}).catch(function(error){   // if it fails (user tries to register email more than once ) , we gonna get error from firebase, that error has a parameter of message (default)
			$rootScope.message = error.message;
			}); // create user 
		}	// register function
	};
}]); //factory
