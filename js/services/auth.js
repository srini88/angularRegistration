// start working on the factory  to take care of authentication service

myApp.factory('Authentication', ['$rootScope', '$firebaseAuth','$location','$firebaseObject', 'FIREBASE_URL', function($rootScope, $firebaseAuth, $location, $firebaseObject, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);


	//detecting if user is logged in
	auth.$onAuth(function(authUser){
		if (authUser){
			var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
			// add firebase Obj to list of dependencies
			var userObj = $firebaseObject(userRef);
			// this obj will have all the info we need
			$rootScope.currentUser = userObj;
		} else {
			$rootScope.currentUser = '';
		}
	});


	// when this factory is called, it is gonna return an object 
	// this object contains different functions , contains login as a method, and register as a method ...controller is gonna be calling this factory 
	

	var myObject =  {
		login: function(user){
			auth.$authWithPassword({
				email: user.email, 
				password: user.password
			}).then(function(regUser){
				// redirect the user to welocme page
				// location service is provided by angular
				$location.path('/success');
			}).catch(function(error){
				$rootScope.message = error.message;	
			});
						
		}, //login

		logout: function(){
			// also run the method called unauth
			return auth.$unauth();
		}, // logout method

		requireAuth : function(){
			// firebase has requireAuth method
			return auth.$requireAuth();
		}, // requireAuthentication

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
			// problem we have, after registering ,  we not logged in, we must login explictily, 
			// to prevent that , i'm letting the user login immediately
			myObject.login(user);

			}).catch(function(error){   // if it fails (user tries to register email more than once ) , we gonna get error from firebase, that error has a parameter of message (default)
			$rootScope.message = error.message;
			}); // create user 
		}	// register function
	};
	return myObject;
}]); //factory
