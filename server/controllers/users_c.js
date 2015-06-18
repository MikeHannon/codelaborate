var mongoose = require('mongoose');

var User = mongoose.model('User');
var bcrypt = require('bcrypt');
console.log("user controller");

module.exports = (function() {
  return {

    show_one_login:function(req,res){
      //console.log(req.body.username);
      User.findOne({"username":req.body.name},function (err,user){
        // if (err){
        // console.log("my:" + user);
        // }
        var temp = bcrypt.genSaltSync(10);
        if (user){
          if (bcrypt.compareSync(req.body.password, user.password)){

            var upsertData  = {"temp_id": temp, "date_updated": Date.now()}
            User.update({"username":req.body.name}, upsertData, {upsert: true}, function(err){});
            console.log("A success" + user);
            console.log(temp);
            res.json({"user_id":temp,
            "name":user.username,
            "functions":user.functions,
            "success":true});
          }
        else{console.log("LOSER");
        res.json({"login":"false"});}
        }

      })
    },
  //showing (get)
    show: function(req, res) {

      //if bcrypt.compareSync("my password", hash); // true
      //bcrypt.compareSync("not my password", hash); // false
      User.find({}, function(err, results) {
        if(err) {
          res.json();
        } else {

          res.json(results);
        }
      })
    },
//adding.
  add: function(req, res){
    //  if (req.body['username']){
    User.findOne({"username":req.body.username},function (err,user){
      var my_user_id;
      if (!user) {
        console.log("unique");

        var current_date = Date.now();

        req.body["date_created"] = current_date;
        req.body["date_updated"] = current_date;

        if (req.body.password.length >= 8){
          if (req.body.password == req.body.repeatedpwd){
            var salt = bcrypt.genSaltSync(10);
            req.body["salt"] = salt;
            var hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;
            var user = new User(req.body);
            user.functions.push({name:"Hello World", description:"Hello World Example", variables:"none", owner:"Nobody and Everybody", return:"String", data : ["function hello_world(){","console.log('hello world');", "return '<h2>Hello World </h2>';}","hello_world();"], stack:"javascript-general"});
            user.save(function(err) {
              if(err) {
                res.json({"login":"false"});
              } else { // else console.log that we did well and then redirect to the root route
                res.json({"login":"true"});
              }
            });

          }
        }
      }
      else{res.json({"login":"false"});}
    });//

    },
//deleting by id. (remove)
    delete: function (req,res){
      Friend.remove(Friend.findOne({_id: req.body._id}),function(err) {
        res.json({"success":"true"});
     })
   },
//delete key from obj
  delete_key: function(req,res){

    User.findOne({"temp_id":req.body.user_id}, function(err, user){
      user.temp_id = undefined;
      user.save();
    });

  },
//upserting (edit by id)
    upsert: function(req,res){
      var upsertData  = req.body;
      Friend.update({_id: req.body._id}, upsertData, {upsert: true}, function(err){});
    },

    say_hello:function(req,res){
    //  console.log("hello world");
      res.json({"success":"true"});
    },

    add_node_function:function(req,res){
      //functionality coming
    //  console.log("hello world");
      res.json({"success":"true"});
    },


    }
})();
