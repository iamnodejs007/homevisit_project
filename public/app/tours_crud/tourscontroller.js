angular.module("tourApp").controller('toursController', ['$scope', 'TourResource', '$http',  function ($scope, TourResource, $http) {
   $scope.tours = TourResource.query();
   $scope.resetFilters = function (){
        $scope.activeDuration = "";
        $scope.activeCity = "";
   };
    
}]);
