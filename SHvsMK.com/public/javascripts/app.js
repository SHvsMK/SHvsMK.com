var myApp = angular.module('SHvsMK', ['ngRoute', 'ngStorage']);

myApp.factory('TokenInterceptor', function($q, $localStorage) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($localStorage.token) {
        config.headers.Authorization = 'Bearer ' + $localStorage.token;
      }
      return config;
    },
    response: function(response) {
      return response || $q.when(response);
    }
  };
});

myApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptor');
});

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/About', {
      templateUrl: 'About',
      controller: 'AboutController'
    }).
    when('/Blog', {
      templateUrl: 'Blog',
      controller: 'BlogController'
    }).
    when('/Signup', {
      templateUrl: 'Signup',
      controller: 'SignupController'
    }).
    when('/Signin', {
      templateUrl: 'Signin',
      controller: 'SigninController'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);
