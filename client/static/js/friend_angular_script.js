
// Lets create our angular module
var friends_app = angular.module('friends_app', ['ngRoute']);

friends_app.config(function ($routeProvider) {
  $routeProvider
    .when('/node',{
        templateUrl: '/partials/node.html'
    })
    .when('/angular',{
        templateUrl: '/partials/angular.html'
    })
    .when('/express',{
        templateUrl: '/partials/express.html'
    })
    .when('/bugs',{
        templateUrl: '/partials/bugs.html'
    })
    .when('/login',{templateUrl:'/partials/login.html'})
    .otherwise({
      redirectTo: '/node'
    });
});
