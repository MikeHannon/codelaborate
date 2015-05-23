//friend factory
friends_app.factory('nodeFactory', function($http) {
  var factory = {};
  var node_functions = [];
  factory.get_node_functions = function(callback) {
  // Where do we get access to $http?
  $http.get('/node_functions').success(function(output) {
    //console.log("response friends from main")
    node_functions = output;
    console.log(output);
    callback(node_functions);
  })
}
  // note the use of callbacks!
  factory.add_node_function = function(info, callback) {
    $http.post('/node_functions',info).success(function(data){
      callback(node_functions);

      });

  }

  factory.delete_node_function = function(info, callback){
    //console.log(info._id);
    $http.post('/node_function_delete',info).success(function(data){
      callback(node_functions);

      });
  }

  factory.just_testing = function(callback){
    //console.log(info._id);
  //  $http.get('/hello_node',info).success(function(){
      //callback(node_functions);
      console.log("successful hello");
    //  });
  }
  return factory;
});

//friend controller

friends_app.controller('nodeController', function($scope, nodeFactory) {
  // $scope.node_functions = [];
  // nodeFactory.get_node_functions(function(data) {
  //   $scope.friends = data;
  // });
  //
  // $scope.add_new_node = function() {nodeFactory.add_node_function($scope.new_node_function, function() {
  //   nodeFactory.get_node_functions(function(data) {
  //     $scope.node_functions = data;
  //   });
  //   $scope.new_node_function = {};
  //
  // });
  // }
  //
  // $scope.remove_node_function = function(data){
  //   //console.log(data);
  //   nodeFactory.delete_node_funtion(data, function() {
  //       nodeFactory.get_node_function(function(data) {
  //         $scope.node_functions = data;
  //      });
  //
  //   // $scope.new_node_function = {};
  //    });
  // }
// rest of the controller code
  $scope.say_hell = function(){
    event.preventDefault()
    nodeFactory.just_testing( function(){
      console.log("hello");
    });
  }
});
