

var tourApp = angular.module("tourApp", ['ngRoute', 'ngResource', 'ngFileUpload', 'ui.bootstrap']);

tourApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});






// CONTROLLERS
    
    
//READ ALL TOURS CONTROLLER, = "toursController", uses factory "TourResource"    
    
    
tourApp.controller('toursController', ['$scope', 'TourResource', '$http',  function ($scope, TourResource, $http) {
   $scope.tours = TourResource.query();
   $scope.resetFilters = function (){
        $scope.activeDuration = "";
        $scope.activeCity = "";
   };
    
}]);





//READ SINGLE ENTRY CONTROLLER = "singleController", uses factory "TourResource"
        
tourApp.controller('singleController', ['$scope', 'TourResource','$routeParams',
function($scope, TourResource, $routeParams) {


$scope.tours = TourResource.get({
id: $routeParams.id
});

}]);
        
//UPDATE AND DELETED TOUR CONTROLLER = "editController", uses factory 'TourResource'
        
tourApp.controller('editController', ['$scope', 'TourResource','$routeParams', '$location', '$window',
function ($scope, TourResource, $routeParams, $location, $window) {


$scope.tours = TourResource.get({
id: $routeParams.id
});

$scope.updateTour = function (){
$scope.tours.$update().then(function () {
  
    $location.path("/tours/" + $routeParams.id);
    });
};
 
$scope.deleteTour = function() {
    $scope.tours.$delete().then(function () {
         $location.path("/tours");
        
    });
};    

}]);

tourApp.controller('uploadController', ['$scope', 'Upload', '$timeout', '$window', '$location', function ($scope, Upload, $timeout, $window, $location) {
    
  
    $scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      url: '/tours',
      METHOD: "POST",
      headers: {
          'Content-Type': 'multipart/form-data'
        },
      data: {name: $scope.tour.name, city: $scope.tour.city, neighborhood: $scope.tour.neighborhood, duration: $scope.tour.duration, categories: $scope.categories, description: $scope.tour.description, file: $scope.tour.image},
    })

    .then(function () {
        $window.location.href = '/#/tours';
         
    });
    
    }
    
    $scope.remove = function(){
            	delete $scope.tour.image;
            }
     
}]);
     
     






     
     