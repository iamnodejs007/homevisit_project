angular.module("tourApp")

.directive("myNavBar", function () {
        return {
        restrict: 'E',        
        templateUrl: './partials/navbar.html',
        controller: 'authbuttonsController'
        
    };

});