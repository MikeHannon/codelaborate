
var node_functions = require('./../server/controllers/nodes_c.js');
var users = require('./../server/controllers/users_c.js');
var bodyParser = require('body-parser');



module.exports = function(app) {

  app.use(bodyParser.json());

  app.get('/hello_node', function(req,res){
    node_functions.say_hello(req,res);
  //  console.log(".....");

  });
  app.get('/build_node', function(req,res){
    node_functions.add_node_function(req,res);

  });
  app.post('/add_user', function(req,res){
    console.log(req.body);
    users.add(req,res);
  });

  app.get('/users/:id',function(req,res){
    console.log(req.params);
    users.show(req,res);
  });

  app.post('/login_user', function(req,res){
    console.log(req.body);
    users.show_one_login(req,res);
  });

  app.post('/user/function/new', function(req,res){
    users.function_new(req,res);
  });
  app.put('/user/function/:id', function(req,res){
    users.function_upsert(req,res);
  });

}
