'use strict';

require('dotenv').config();
const {Server} = require('socket.io');
const io = new Server();
io.listen(3000);
const caps = io.of('/caps');
// //all functions for pick, picked up, delivered, in-transits (socket.on)

function handlePickup(payload, socket) {
  console.log('The pickup was requested', payload.orderId);
  // socket.emit('received', {message:'Pickup acknowledged'});
}


function handleConnection(socket) {
  socket.on('pickup', (payload) => {
    handlePickup(payload, socket);
  });
}

function startServer() {
  console.log('The server has been started');
  caps.on('connection', handleConnection);
}

module.exports = {handleConnection, startServer};