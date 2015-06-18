//friend factory
friends_app.factory('loginFactory', function($http) {
  var factory = {};
  var users = [];
  factory.get_users = function(callback) {
  // Where do we get access to $http?
  $http.get('/get_users').success(function(output) {
    //console.log("response friends from main")
    node_functions = output;
    console.log(output);
    callback(users);
  })
}
  // (registration)
  factory.add_user = function(info, callback) {
    $http.post('/add_user',info).success(function(data){
      console.log(data);

      });

  }
  // (remove user)
  factory.delete_user = function(info, callback){
    //console.log(info._id);
    $http.post('/delete_user',info).success(function(data){
      callback(users);

      });
  }

  // (login)
  factory.create_user = function(userInfo,callback){
    if (userInfo !== undefined){
      if (userInfo['password'] && userInfo['repeatedpwd']){
        $http.post('/add_user',userInfo).success(function(data){
          //console.log("I am here?");
          if(data.login){
            userInfo['name'] = userInfo.username;
            console.log(userInfo);
             $http.post('/login_user',userInfo).success(function(data){

              callback(data);
            });
          }

        });
      }
    }
    else {}
    console.log(userInfo);
  }

  factory.login_user = function(userInfo, callback){
    $http.post('/login_user',userInfo).success(function(data){
      callback(data);
    });
  }


  return factory;
});

//friend controller

friends_app.controller('loginController', function($scope, $location, loginFactory) {
  $scope.myId = "";
  $scope.say_hello = function(userInfo){
    console.log(userInfo);
    loginFactory.create_user(userInfo,function(data){
      $scope.user_id.name = data.name;
        $scope.user_id.functions = data.functions;
        $scope.user_id.name = data.name;
        $scope.user_id.temp_id = data.user_id;
        if (data.success){$location.path('/');}
      //console.log($scope.user_id)
    });
  }

    $scope.logmein = function(userInfo){
      //loginFactory.login_user(userInfo);
      loginFactory.login_user(userInfo,function(data){ $scope.user_id.name = data.name;
        $scope.user_id.functions = data.functions;
        $scope.user_id.name = data.name;
        $scope.user_id.temp_id = data.user_id;
        if (data.success){$location.path('/');}
      });

    }

});
