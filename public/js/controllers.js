tourApp.controller('homeController', function($scope) {

        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });


jessApp.controller('jessController', function($scope) {

        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });
    
    
    jessApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    jessApp.controller('hiremeController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });