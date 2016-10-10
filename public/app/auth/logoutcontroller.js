angular.module("tourApp").controller('authbuttonsController',
  ['$scope', '$location', 'AuthService', '$rootScope',
  function ($scope, $location, AuthService, $rootScope) {
   
    
    
    
   

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
         
        });

    };

}]);
