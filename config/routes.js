var friends = require('./../server/controllers/friends.js');
var node_functions = require('./../server/controllers/nodes_c.js');
var bodyParser = require('body-parser');

module.exports = function(app) {
  app.get('/friends', function(req, res) {
  console.log("calls friends");

  friends.show(req, res);
  });

  app.post('/friends',bodyParser.json(), function(req,res){
    friends.add(req,res);
    console.log(req.body);
  });
  app.post('/friend_delete',bodyParser.json(), function(req,res){
    console.log(req.body);
    friends.delete(req,res);
  //  console.log(req.body);
  });
  app.get('/hello_node', function(req,res){
    node_functions.say_hello(req,res);
    console.log(".....");

  });
}
