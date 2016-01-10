var myApp = angular.module('myApp', []);

// first arg is name of controller, second array is the dependencies 
myApp.controller('appController', ['$scope', function($scope){
	$scope.message = "Welcome to my App";
}]);

// one app - two different controllers 
myApp.controller('appController2', ['$scope', function($scope){
	$scope.message = "message from my second controller";
}]);