var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
//  console.log(socket.id);
  //console.log('a user connected');
  socket.on('disconnect', function(){
  //  console.log('user disconnected');
  });
  socket.on('chat message', function(){
   console.log('message: ');
 });

  //all the socket code goes in here!
})
