var mongoose = require('mongoose');

var Friend = mongoose.model('Friend');
console.log("controller");

module.exports = (function() {
  return {
  //showing (get)
    show: function(req, res) {
      Friend.find({}, function(err, results) {
        if(err) {
          console.log(err);
        } else {

          res.json(results);
        }
      })
    },
//adding.
    add: function(req, res){
      console.log(req.body);
       var new_friend = new Friend(req.body);
      //
      new_friend.save(function(err) {
         // if there is an error console.log that something wrong!
        if(err) {
           console.log('something went wrong');
         } else { // else console.log that we did well and then redirect to the root route
        //  console.log('successfully added a friend!');
        res.json({"success":"true"});
         }
       });
    },
//deleting by id. (remove)
    delete: function (req,res){
      Friend.remove(Friend.findOne({_id: req.body._id}),function(err) {
        res.json({"success":"true"});
     })
   },
//upserting (edit by id)
    upsert: function(req,res){
      var upsertData  = req.body;
      Friend.update({_id: req.body._id}, upsertData, {upsert: true}, function(err){});
    }

    }
})();
