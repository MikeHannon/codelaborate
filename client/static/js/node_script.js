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



  return factory;
});

//friend controller

friends_app.controller('nodeController', function($scope, nodeFactory) {

// rest of the controller code


  $scope.load_function = function(){
    event.preventDefault();
  //  console.log($scope.user_id + "TOTALLY");
  }

});
