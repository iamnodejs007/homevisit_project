angular.module('tourApp').factory('AuthService',
  ['$q', '$timeout', '$http', '$rootScope',
  function ($q, $timeout, $http, $rootScope) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });
    
    
    function isLoggedIn() {
    if(user) {
     
    return true;
  } else {
    return false;
  }
}

    function getUserStatus() {
  return $http.get('/status')
  // handle success
  .success(function (data) {
    if(data.status){
      $rootScope.userLoggedIn = true;
      user = true;
    } else {
      $rootScope.userLoggedIn = false;
      user = false;
    }
  })
  // handle error
  .error(function (data) {
    user = false;
  });
}



function login(username, password) {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.post('/login',
    {username: username, password: password})
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        user = true;
        deferred.resolve();
      } else {
        user = false;
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}

function logout() {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a get request to the server
  $http.get('/logout')
    // handle success
    .success(function (data) {
      user = false;
      deferred.resolve();
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}

function register(username, password) {


  var deferred = $q.defer();

  
  $http.post('/register',
    {username: username, password: password})
   
    .then(function (data, status) {
      if(status === 200 && data.status){
        deferred.resolve();
      } else {
        deferred.reject();
      }
    })
    
    .error(function (data) {
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}


}]);
