/*global angular*/

var tourApp = angular.module("tourApp", ['ngRoute', 'ngResource']);

tourApp.config(function($routeProvider, $locationProvider)  {

$routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'home.html',
                controller  : 'jessController'
            })

            // route for the single tour page
            .when('/tours/:id', {
                templateUrl : 'singletour.html',
                controller  : 'singleController'
            })

            // route for the tours archive page
            .when('/tours', {
                templateUrl : 'tours.html',
                controller  : 'toursController'
            })
            
            .when('/addtour', {
                templateUrl : 'addtour.html',
                controller  : 'addController'
            })
            
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

    
    
//     tourApp.factory("PostService", function($resource) {
//   return $resource("/tours/:id");
// });
    

    // Controller
tourApp.controller('toursController', ['$scope', 'TourService', '$http', function ($scope, TourService, $http) {
      TourService.success(function(data){
        $scope.tours = data;
        })
        .error(function(data, status){
        console.log(data, status);
        $scope.tours = [];
              });
    
}]);


 tourApp.controller ('addController', function ($scope, $http) {
      $scope.addTour = function (tour) {
    $http.post ("/tours", $scope.tour )
     }
     });
        
        
tourApp.controller('singleController', ['$scope', 'SingleService','$routeParams',
function($scope, SingleService, $routeParams) {
$scope.tours = {};
SingleService.get({
id: $routeParams.id
}, function (data) {
$scope.tours = data;


});




}]);
        
        
        
        
tourApp.controller('editController', ['$scope', 'SingleService','$routeParams',
function($scope, SingleService, $routeParams) {

$scope.tours = SingleService.get({
id: $routeParams.id
});

    
$scope.updateTour = function (tours){
$scope.tours.$update();
alert ()
};
}]);


// $scope.tours.$update = function() {


// };        
        
        
        
        
        
        
        
        
        
// tourApp.controller ('singleController', function ($scope, $http) {
//       $http.get('/api/tours/' + id)
//         .success(function(data) {
//             $scope.tours = data;        })
//         .error(function(data) {
//             console.log('Error: ' + data);
//         });

      
      
//   tourApp.controller('singleTourController', ['$scope', 'singleTourService', '$http', function ($scope, singleTourService, $http) {
//       singleTourService.success(function(data){
//         $scope.tours = data;
//         })
//         .error(function(data, status){
//         console.log(data, status);
//         $scope.tours = [];
//               });
    
// }]);       
     
     
     
     
     
     
     

    