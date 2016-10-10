angular.module("tourApp").controller('editController', ['$scope', 'TourResource','$routeParams', '$location', '$window',
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