// require express so that we can build an express app
var express = require('express');
//var bodyParser = require('body-parser');

// require path so that we can use path stuff like path.joi
var path = require('path');
// instantiate the app
var app = express();

require('./config/mongoose.js');

require('./config/routes.js')(app);


// set up a static file server that points to the "client" directory
//app.use(express.static(__dirname + "/client/static"));
codeArray = [];
socket_users = [];
app.use(express.static(path.join(__dirname, './client/static')));


var server = app.listen(8000, function() {
  console.log('cool stuff on: 8000');
});


//socket stuf
var io = require('socket.io').listen(server);

function findClientsSocket(roomId, namespace) {
    var res = []
    , ns = io.of(namespace ||"/");    // the default namespace is "/"

    if (ns) {
        for (var id in ns.connected) {
            if(roomId) {
                var index = ns.connected[id].rooms.indexOf(roomId) ;
                if(index !== -1) {
                    res.push(ns.connected[id]);
                }
            } else {
                res.push(ns.connected[id]);
            }
        }
    }
    return res;
}

//var clients = findClientsSocket(null, '/chat') ;

//var clients = findClientsSocket('room', '/chat') ;

//var clients = findClientsSocket() ;

//var clients = findClientsSocket('room') ;

function findClientsSocketByRoomId(roomId) {
var res = []
, room = io.sockets.adapter.rooms[roomId];
if (room) {
    for (var id in room) {
    res.push(io.sockets.adapter.nsp.connected[id]);
    }
}
return res;
}

io.sockets.on('connection', function (socket) {
  var clients = findClientsSocket();
  var myBool = false;
  var activeRoomIndex = 0;
  for (var i = 0; i < codeArray.length; i ++){
    if (codeArray[i].room == socket.id){
      myBool = true;
    }
  }
  if (!myBool){
    codeArray.push({"room":socket.id, data:[]});
    activeRoomIndex = codeArray.length -1;
  }
  //console.log(socket.rooms);
  if (!socket['nickname']){
  socket['nickname'] = "guest";
  var myRoom = "room"+activeRoomIndex;
  socket.join(myRoom);
  //console.log(socket);
  socket_users.push({"socket":socket.id, "name":socket.nickname, "current_room":myRoom});
  }
  var myIndex;
  for (var i = 0; i < socket_users.length; i ++){
    if (socket_users[i].socket == socket.id){
      myIndex = i;
      break;
    }
  }
  var roomIndex;
  for (var i = 0; i < socket_users.length; i ++){
    if (socket_users[i].current_room == socket.id){
      roomIndex = i;
      break;
    }
  }

  //socket.broadcast.emit("new_user", socket.nickname);


  socket.on('disconnect', function(){
    var myArray = [];
    for (var i = 0; i < socket_users.length; i ++){
      if(socket.id == socket_users[i].socket){
        socket_users.splice(i,1);
        break;
      }
    }
    //id socket it and remove it from the socket_users
    for (user in socket_users){
      myArray.push(socket_users[user]);
    }
    socket.broadcast.emit("new_user", myArray);
  });

  socket.on('update_nickname',function(data){

    socket['nickname'] = data;
    for (var i = 0; i < socket_users.length; i ++){
      if(socket.id == socket_users[i].socket){
        socket_users[i].name = data;
        break;
      }
    }
    //id socket it and update the name socket_users
    var myArray = [];
    for (user in socket_users){
      myArray.push(socket_users[user]);
    }
    io.emit("new_user", myArray);
  });

  socket.on('chat message', function(code){
    for (var i = 0; i < socket_users.length; i ++){
      if (socket_users[i].socket == socket.id){
        myIndex = i;
        break;
      }
    }
    //console.log(socket.rooms);

    //codeArray[activeRoomIndex].data


    var after_cursor = code.line.substring(code.cursor,code.line.length);
    code.line = code.line.substring(0,code.cursor);
    code["remainder"] = after_cursor;
    if (code.line.length > 0){
    code.line += "//";
    code.line += code.name;


    }

    codeArray[activeRoomIndex].data[(code.index)] = code;
    //console.log(codeArray[activeRoomIndex]);
    codeArray[activeRoomIndex].data.splice((code.index+1),0,{"line":after_cursor, "index":code.index+1});
    // for (var i = code.index+2; i < codeArray.length; i ++){
    //
    //   console.log("????");
    //   //codeArray[activeRoomIndex].data[i].index ++;
    // }    //codeArray[(code.index+1)] = {};
    //var room_id = "room" +activeRoomIndex;
    io.to(socket_users[myIndex].socket).emit('some event',"hello");
    io.to(socket_users[myIndex].current_room).emit('some event', 'goodbye');

    // for (var i = 0; i < socket_users[roomIndex].sockets_in_room.length; i ++){
    //   io.to(socket_users[roomIndex].sockets_in_room[i]).emit('some event',"hello");
    // }
    io.to(socket_users[myIndex].current_room).emit('function_update', codeArray[activeRoomIndex].data);
    io.to(socket_users[myIndex].current_room).emit('linupdate',code.index);
    // io.emit('function_update', codeArray[activeRoomIndex].data);
    // socket.emit('linupdate',code.index);

  });
  socket.on("change_rooms", function(data){
    for (var i = 0; i < socket_users.length; i ++){
      if (socket_users[i].socket == socket.id){
        myIndex = i;
        break;
      }
    }
    console.log(data.new_room);
    activeRoomIndex = data.new_room.replace("room", "");
    socket_users[myIndex].current_room = data.new_room;
    socket.join(data.new_room);


  });

   socket.on("delete_message",function(myArray){
     for (var i = 0; i < socket_users.length; i ++){
       if (socket_users[i].socket == socket.id){
         myIndex = i;
         break;
       }
     }
     codeArray[activeRoomIndex].data = [];
     codeArray[activeRoomIndex].data = myArray;
     io.to(socket_users[myIndex].current_room).emit('function_update2', codeArray[activeRoomIndex].data);
      // io.emit('function_update2', codeArray[activeRoomIndex].data);
   });

   socket.on("want_to_join", function(data){
     for (var i = 0; i < socket_users.length; i ++){
       if (socket_users[i].socket == socket.id){
         myIndex = i;
         break;
       }
     }
     //activeRoomIndex =
    // console.log(data
    // console.log(socket_users[myIndex].socket);
     io.to(data).emit('private_message',socket_users[myIndex]);
   });

})
