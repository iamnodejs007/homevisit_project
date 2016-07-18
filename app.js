/*global angular*/

var tourApp = angular.module("tourApp", ['ngRoute']);

tourApp.config(function($routeProvider, $locationProvider)  {

$routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'home.html',
                controller  : 'mainController'
            })

            // route for the single tour page
            .when('/singletour', {
                templateUrl : 'singletour.html',
                controller  : 'aboutController'
            })

            // route for the alltours page
            .when('/alltours', {
                templateUrl : 'alltours.html',
                controller  : 'contactController'
            })
            
            .when('/addtour', {
                templateUrl : 'addtour.html',
                controller  : 'hiremeController'
            })
            
           
            
    });



tourApp.controller('mainController', function($scope) {

        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });


tourApp.controller('jessController', function($scope) {

        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });
    
    
    tourApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    tourApp.controller('hiremeController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });
    
    