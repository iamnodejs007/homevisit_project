angular.module("tourApp").controller('singleController', ['$scope', 'TourResource','$routeParams',
function($scope, TourResource, $routeParams) {


$scope.tours = TourResource.get({
id: $routeParams.id
});

}]);