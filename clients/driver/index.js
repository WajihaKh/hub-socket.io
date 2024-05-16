'use strict';

require('dotenv').config();
const {io} = require('socket.io-client');
const socket = io('http://localhost:3000/caps');

socket.emit('driver-ready');

socket.on('pickup', (payload) => {
  setTimeout(() => {
    console.log('Driver has picked up package', payload);
    socket.emit('in-transit', payload);


  }, 1000);

  setTimeout(() => {
    console.log('Package has been delivered', payload.orderId);
    socket.emit('delivered', payload);
    socket.emit('driver-ready');

  }, 3000);

});



module.exports = {};
