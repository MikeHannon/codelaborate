

friends_app.factory('MainFactory', function($http) {
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

  factory.updateUser = function (info, callback){
    $http.post('/user/update', info).success(function(data){});
    console.log(info);
  }
  return factory;
});

friends_app.controller('MainController',function($scope,MainFactory){
    $scope.working_index = 0;
    $scope.user_id = {name:"guest",
    temp_id:"0",
    functions:[{name:"Hello World"}],
    //this_index = 0

    }

    $scope.add_Function = function(myData) {
      $scope.new_function['data']=[];
      $scope.new_function['owner']=$scope.user_id.name;
      $scope.user_id.functions.push($scope.new_function);
      MainFactory.updateUser($scope.user_id, function(){

      });
      $scope.working_index ++;
    //  console.log();
      $scope.new_function = {};
  }
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
