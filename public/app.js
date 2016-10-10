

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



// tourApp.controller('uploadController', ['$scope', 'Upload', '$timeout', '$window', '$location', function ($scope, Upload, $timeout, $window, $location) {
    
  
//     $scope.uploadPic = function(file) {
//     file.upload = Upload.upload({
//       url: '/tours',
//       METHOD: "POST",
//       headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//       data: {name: $scope.tour.name, city: $scope.tour.city, neighborhood: $scope.tour.neighborhood, duration: $scope.tour.duration, categories: $scope.categories, description: $scope.tour.description, file: $scope.tour.image},
//     })

//     .then(function () {
//         $window.location.href = '/#/tours';
         
//     });
    
//     }
    
//     $scope.remove = function(){
//             	delete $scope.tour.image;
//             }
     
// }]);
     
     






     
     