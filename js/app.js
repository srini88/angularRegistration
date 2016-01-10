var myApp = angular.module('myApp', ['ngRoute']);

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
		controller:'SuccessController'
	}).
	otherwise({
		redirectTo:'/login'
	});
}]);
