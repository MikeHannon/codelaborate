

friends_app.factory('MainFactory', function($http) {
  var factory = {};
  var friends = [];


  // note the use of callbacks!
  factory.show = function(info,callback){
    $http.get('/users/'+info.name).success(function(data){
      callback(data);
    });

  }
  factory.save_function = function (info,callback){
    $http.put('user/function/'+info.name,info).success(function(data){
      console.log(data);
      callback();
      });


  }

  factory.add_function = function (info, callback){
    $http.post('/user/function/new', info).success(function(data){});
  }
  return factory;
});

friends_app.controller('MainController',function($scope,MainFactory){
    $scope.working_index = 0;
    $scope.functional_data = [];
    $scope.new_function_boolean = false;
    $scope.new_function = {};
    $scope.socket;
    $scope.user_id = {name:"guest",
    temp_id:"0",
    functions:[],
    //this_index = 0
    };
    $scope.invite_boolean = false;
    $scope.chat_boolean = false;
  $scope.save_function = function(data){

      if ($scope.user_id.functions[$scope.working_index]){

    $scope.user_id.functions[$scope.working_index].data = data;

      MainFactory.save_function($scope.user_id,function(){
        MainFactory.show($scope.user_id,function(data){

        $scope.user_id = data;
      //  console.log(data);

        });
      });

    }
  }

    $scope.add_Function = function(myData) {
      $scope.new_function['data']=$scope.functional_data;
      $scope.new_function['owner']=$scope.user_id.name;
      $scope.user_id.functions.push($scope.new_function);
      $scope.working_index = $scope.user_id.functions.length - 1;
      console.log($scope.new_function_boolean);
      MainFactory.add_function($scope.user_id, function(){

        console.log($scope.working_index);
      });

    //  console.log();
      $scope.new_function = {};
  }
});
