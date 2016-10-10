angular.module("tourApp").config(function($routeProvider, $locationProvider)  {

$routeProvider

            // route for the home page
            .when('/', {
                templateUrl : '/partials/home.html',
                controller  : 'toursController',
                access: {restricted: false}
            })

            // route for the read single tour page
            .when('/tours/:id', {
                templateUrl : '/partials/singletour.html',
                controller  : 'editController',
                access: {restricted: false}
            })

            // route for the read all tours page
            .when('/tours', {
                templateUrl : '/partials/tours.html',
                controller  : 'toursController',
                access: {restricted: false}
            })
            
            //route for the create new tour page
            .when('/addtour', {
                templateUrl : '/partials/addtour.html',
                controller  : 'uploadController',
                access: {restricted: true}
            })
            //route for the edit tour form
               .when ('/tours/:id/edit',  {
               templateUrl : '/partials/edit.html',
               controller: 'editController',
               access: {restricted: true}
           })
           
           //route for the photo credits from
               .when ('/photocredits',  {
               templateUrl : '/partials/credits.html',
               controller: 'editController'
           })
           
        //route for the register form
               .when ('/register',  {
               templateUrl : '/partials/register.html',
               controller: 'registerController',
               access: {restricted: false}
           })   
           
           
           //route for the login form
               .when ('/login',  {
               templateUrl : '/partials/login.html',
               controller: 'loginController',
               access: {restricted: false}
           }) 
           
           //route for the logout page
               .when ('/logout',  {
               templateUrl : '/partials/logout.html',
               controller: 'logoutController',
               access: {restricted: true}
           }) 
    });