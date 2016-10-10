angular.module("tourApp").factory('TourResource', ['$resource', function ($resource){
      return $resource('/tours/:id', {id:"@_id"},{
      update: {
        method: 'PUT'
      }

});  

}]);

