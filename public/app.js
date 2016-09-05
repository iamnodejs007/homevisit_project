/*global angular*/

var tourApp = angular.module("tourApp", ['ngRoute', 'ngResource', 'ngMessages', 'ngFileUpload', 'ui.bootstrap', 'angular.filter']);

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
                controller  : 'singleController'
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
tourApp.factory('TourService', ['$http', function($http){
      return $http.get('/tours');
    }])
    
tourApp.factory('SingleService', function ($resource){
      return $resource('/tours/:id', {id:"@_id"},{
      update: {
        method: 'PUT'
      }}

);  

});

    
    


// CONTROLLERS
    
    
//READ ALL TOURS CONTROLLER, = "toursController", uses factory "TourService"    
    
    
tourApp.controller('toursController', ['$scope', 'TourService', '$http', function ($scope, TourService, $http) {
      TourService.success(function(data){
        $scope.tours = data;
        })
        .error(function(data, status){
        console.log(data, status);
        $scope.tours = [];
              });
    
}]);





//READ SINGLE ENTRY CONTROLLER = "singleController", uses factory "SingleService"
        
tourApp.controller('singleController', ['$scope', 'SingleService','$routeParams',
function($scope, SingleService, $routeParams) {
$scope.tours = {};
SingleService.get({
id: $routeParams.id
}, function (data) {
$scope.tours = data;


});

}]);
        
//UPDATE AND DELETED TOUR CONTROLLER = "editController", uses factory 'SingleService'
        
tourApp.controller('editController', ['$scope', 'SingleService','$routeParams', '$location', '$window',
function ($scope, SingleService, $routeParams, $location, $window) {

$scope.tours = SingleService.get({
id: $routeParams.id
});

$scope.updateTour = function (tours){
$scope.tours.$update(function () { 
        $window.location.href = '/#/tours';
         $window.location.reload();
    });
};
 
$scope.deleteTour = function (tours) {
    $scope.tours.$delete(function () {
        $window.location.href = '/#/tours';
        window.location.reload();
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

    .success (function () {
        $window.location.href = '/#/tours';
         $window.location.reload();
    });
    
    }

     
}]);
     

    