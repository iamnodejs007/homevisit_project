angular.module("tourApp").controller('loginController', ['$scope','$location', 'AuthService', '$rootScope', function ($scope, $location, AuthService, $rootScope ){
    $scope.logIn = function () {
        
        $scope.error = false;
        $scope.disabled = true;

        
        AuthService.login($scope.user.username, $scope.user.password)
        .then(function () {  
          
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        
          
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    }
    
    
    
    
}]);