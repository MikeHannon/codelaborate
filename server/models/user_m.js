// This is the friend.js file located at /server/models/friend.js
// We want to create a file that has the schema for our friends and creates a model that we can then call upon in our controller
var mongoose = require('mongoose');
// create our friendSchema
var FunctionSchema = new mongoose.Schema({
  name:String,
  data:Array,
  description:String,
  return:String,
  variables:String,
  owner:String,
  stack:String,
  created_at:String,
  updated_at:String
  //temp_id:String
});

mongoose.model('Function', FunctionSchema);

var UserSchema = new mongoose.Schema({
  username: {type:String, unique:true},
  first_name:String,
  last_name:String,
  password:String,
  email:String,
  functions:[FunctionSchema],
  salt:String,
  date_created:Number,
  date_updated:Number,
  temp_id:String
});


// create our friendSchema



// use the schema to create the model
// Note that creating a model CREATES the collection in the database (makes the collection plural eg. friends) <-- won't show up initially until you write to it!
mongoose.model('User', UserSchema);

var lengthValidator = function(val) {
  if (val && val.length >= 6){
    return true;
  }
  return false;
};

var lengthValidator2 = function(val) {
  if (val && val.length >= 8){
    return true;
  }
  return false;
};


// var FunctionSchema = new mongoose.Schema({
//   name:String,
//   data:Array,
//   description:String,
//   return:String,
//   variables:Array,
//   owner:String,
//   created_at:String,
//   updated_at:String
//   //temp_id:String
// });
FunctionSchema.path('name').required(true, 'name');
FunctionSchema.path('data').required(true, 'name');
FunctionSchema.path('description').required(true, 'name');
FunctionSchema.path('return').required(true, 'name');
FunctionSchema.path('variables').required(true, 'name');
FunctionSchema.path('stack').required(true, 'name');
FunctionSchema.path('owner').required(true, 'name');

//console.log("model");
UserSchema.path('username').required(true, 'user name ');
UserSchema.path('first_name').required(true, 'first name ');
UserSchema.path('last_name').required(true, 'last name ');
UserSchema.path('password').required(true, 'password ');
UserSchema.path('email').required(true, "email");
UserSchema.path('functions').required(true, "functions");
UserSchema.path('date_created').required(true, "date_updated");
UserSchema.path('date_updated').required(true,"date_created");
UserSchema.path('salt').required(true,"date_created");
UserSchema.path('username').validate(lengthValidator,"name must be at least 6 characters");
UserSchema.path('password').validate(lengthValidator2,"password must be at least 8 characters");
