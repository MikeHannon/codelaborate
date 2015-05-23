
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
    .when('/socket',{
        templateUrl: '/partials/socket.html'
    })
    .otherwise({
      redirectTo: '/node'
    });
});

//friend factory
friends_app.factory('FriendFactory', function($http) {
  var factory = {};
  var friends = [];
  factory.getFriends = function(callback) {
  // Where do we get access to $http?
  $http.get('/friends').success(function(output) {
    console.log("response friends from main")
    friends = output;
    console.log(output);
    callback(friends);
  })
}
  // note the use of callbacks!
  factory.addFriend = function(info, callback) {
    $http.post('/friends',info).success(function(data){
      callback(friends);

      });

  }

  factory.deleteFriend = function(info, callback){
    //console.log(info._id);
    $http.post('/friend_delete',info).success(function(data){
      callback(friends);

      });
  }
  return factory;
});

//friend controller

friends_app.controller('FriendsController', function($scope, FriendFactory) {
  $scope.friends = [];
  FriendFactory.getFriends(function(data) {
    $scope.friends = data;
  });

  $scope.addfriend = function() {FriendFactory.addFriend($scope.new_friend, function() {
    FriendFactory.getFriends(function(data) {
      $scope.friends = data;
    });
    $scope.new_friend = {};

  });
  }

  $scope.removefriend = function(data){
    //console.log(data);
    FriendFactory.deleteFriend(data, function() {
        FriendFactory.getFriends(function(data) {
          $scope.friends = data;
       });

     $scope.new_friend = {};
     });
  }

// rest of the controller code
});
