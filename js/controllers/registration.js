myApp.controller('RegistrationController',['$scope', function($scope){
	$scope.login = function(){
		// this message will be printed from the login.html page
		$scope.message = "Welcome "+ $scope.user.email;
	};
	//register is the function frmo the register.html page
	$scope.register = function(){
		$scope.message = "Welcome "+ $scope.user.firstname
		+ $scope.user.lastname+ $scope.user.password;
	};

}]);