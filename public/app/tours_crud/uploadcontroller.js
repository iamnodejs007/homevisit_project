angular.module("tourApp").controller('uploadController', ['$scope', 'Upload', '$timeout', '$window', '$location', function ($scope, Upload, $timeout, $window, $location) {
    
  
    $scope.uploadPic = function(file) {
    Upload.upload({
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
     