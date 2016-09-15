

var tourApp = angular.module("tourApp", ['ngRoute', 'ngResource', 'ngMessages', 'ngFileUpload', 'ui.bootstrap']);

tourApp.config(function($routeProvider, $locationProvider)  {

$routeProvider

            // route for the home page
            .when('/', {
                templateUrl : '/home.html',
                controller  : 'toursController'
            })

            // route for the read single tour page
            .when('/tours/:id', {
                templateUrl : '/singletour.html',
                controller  : 'editController'
            })

            // route for the read all tours page
            .when('/tours', {
                templateUrl : '/tours.html',
                controller  : 'toursController'
            })
            
            //route for the create new tour page
            .when('/addtour', {
                templateUrl : 'addtour.html',
                controller  : 'uploadController'
            })
            //route for the edit tour form
               .when ('/tours/:id/edit',  {
               templateUrl : '/edit.html',
               controller: 'editController'
           })
           
           //route for the photo credits from
               .when ('/photocredits',  {
               templateUrl : '/credits.html',
               controller: 'editController'
           })
    });


//SERVICES AND FACTORIES

    
tourApp.factory('TourResource', function ($resource){
      return $resource('/tours/:id', {id:"@_id"},{
      update: {
        method: 'PUT'
      }}

);  

});

    
    


// CONTROLLERS
    
    
//READ ALL TOURS CONTROLLER, = "toursController", uses factory "TourResource"    
    
    
tourApp.controller('toursController', ['$scope', 'TourResource', '$http',  function ($scope, TourResource, $http) {
   $scope.tours = TourResource.query();
    
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
      data: {name: $scope.tour.name, city: $scope.tour.city, neighborhood: $scope.tour.neighborhood, duration: $scope.tour.duration, description: $scope.tour.description, file: $scope.tour.image},
    })

    .then(function () {
        $window.location.href = '/#/tours';
         
    });
    
    }
    
    $scope.remove = function(){
            	delete $scope.tour.image;
            }
     
}]);
     

    