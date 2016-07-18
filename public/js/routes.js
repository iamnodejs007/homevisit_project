tourApp.config(function($routeProvider)  {

$routeProvider

            // route for the home page
            .when('/', {
                templateUrl : '/public/pages/home.html',
                controller  : 'homeController'
            })

            // route for the All Tours Archive page
            .when('/alltours', {
                templateUrl : '/public/pages/alltours.html',
                controller  : 'allToursController'
            })

            // route for the Single Tour page
            .when('/singletour', {
                templateUrl : '/public/pages/singletour.html',
                controller  : 'singleTourController'
            })
            
            
    });