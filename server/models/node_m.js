// This is the friend.js file located at /server/models/friend.js
// We want to create a file that has the schema for our friends and creates a model that we can then call upon in our controller
var mongoose = require('mongoose');
// create our friendSchema
var NodeSchema = new mongoose.Schema({
  name: String,
  age: Number
});
// use the schema to create the model
// Note that creating a model CREATES the collection in the database (makes the collection plural eg. friends) <-- won't show up initially until you write to it!
mongoose.model('Node_Function', NodeSchema);

//console.log("model");
