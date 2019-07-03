const express = require('express');
const app = express();
const path = require('path');


//setting
app.set('port',process.env.PORT || 3000); // esto dice que tome el puerto del sistema operativo si hay uno configurado sino lo hay tome el 3000, esto sirve para cuando lo subes a un entorno como el de la nube con uno definido
const PORT = app.get('port');

//static files
app.use(express.static(path.join(__dirname,'public')));

const server = app.listen(PORT, ()=>{
  console.log('Server on port', PORT);
});

const socketio = require('socket.io');
const io = socketio(server);

//websockets
io.on('connection',(socket)=>{
  console.log("New connections",socket.id);

  socket.on('chat:message',(data)=>{
    io.sockets.emit('chat:message', data);
  });

  socket.on('chat:typing', (data)=>{
    socket.broadcast.emit('chat:typing', data);
  });
});
