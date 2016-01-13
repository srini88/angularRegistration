
//setting up firebase dependency , just created a constant to manage the URL 

var myApp = angular.module('myApp', ['ngRoute', 'firebase'])
			.constant('FIREBASE_URL', 'https://angularregi.firebaseio.com/');

// trap an even when there is an error if the map does not resolve 
myApp.run(['$rootScope', '$location', function($rootScope, $location){
	$rootScope.$on('$routeChangeError', 
		function(event, next, previous, error){
			// we need info in the error, they are in order, thats why 1st 3 args 
			if (error == 'AUTH_REQUIRED'){
				$rootScope.message = 'Sorry, you must log in to access that page';
				// then use the location service, to direct back user to the login page
				$location.path('/login');
			}
			
		});
}]);
// remember using config method since using routes

// when somebody goes to login section - go to this template
// also specify a controller for this goddammn view (tie route and controller)
myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/login', {
		templateUrl:'views/login.html',
		controller: 'RegistrationController'
	}).
	when('/register', {
		templateUrl:'views/register.html',
		controller:'RegistrationController'
	}).
	when('/success',{
		templateUrl:'views/success.html',
		controller:'SuccessController',
		// with whatever we have , when somebody goes to success page, we still show the success message (worng) without logging in
		// so control if somebody can see the page, depending uopn whether somebody authenticated the user 
		//adding resolve feature, has map of dependencies that the router service will wait to be resolved before going on, if theese promises resolved correctly, everything will be fine, if any of em gets rejected it will create an event called routeChageError
		resolve: {
			// fucntion calling authentication service
			currentAuth: function(Authentication){
				return Authentication.requireAuth(); // need to create reqAuth method
			}
		} // resolve 
	}).
	otherwise({
		redirectTo:'/login'
	});
}]);
