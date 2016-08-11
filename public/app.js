/*global angular*/

var tourApp = angular.module("tourApp", ['ngRoute', 'ngResource', 'ngMessages']);

tourApp.config(function($routeProvider, $locationProvider)  {

$routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'home.html',
                controller  : 'jessController'
            })

            // route for the read single tour page
            .when('/tours/:id', {
                templateUrl : 'singletour.html',
                controller  : 'singleController'
            })

            // route for the read all tours page
            .when('/tours', {
                templateUrl : 'tours.html',
                controller  : 'toursController'
            })
            
            //route for the create new tour page
            .when('/addtour', {
                templateUrl : 'addtour.html',
                controller  : 'addController'
            })
            //route for the edit tour form
               .when ('/tours/:id/edit',  {
               templateUrl : 'edit.html',
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


//CREATE NEW ENTERY CONTROLLER, = "addController", no factory, $uses "http.post"

 tourApp.controller ('addController', function ($scope, $http) {
      $scope.addTour = function (tour) {
    $http.post ("/tours", $scope.tour )
     }
     });
        



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
        
tourApp.controller('editController', ['$scope', 'SingleService','$routeParams', '$location',
function ($scope, SingleService, $routeParams, $location) {

$scope.tours = SingleService.get({
id: $routeParams.id
});

$scope.updateTour = function (tours){
$scope.tours.$update(function () { 
        $location.path('/tours');
    });
};
 
$scope.deleteTour = function (tours) {
    $scope.tours.$delete(function () {
        $location.path ('/tours');
    });
};    

}]);



     
     
     

    