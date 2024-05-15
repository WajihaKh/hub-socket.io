'use strict';

require('dotenv').config();
const {io} = require('socket.io-client');
const socket = io(process.env.RENDER_URL);

socket.on('pickup', (payload) => {
  setTimeout(() => {
    console.log('Driver has picked up package');
    socket.emit('in-transit', payload);

  }, 1000);

  setTimeout(() => {
    console.log('Package has been delivered');
    socket.emit('delivered', payload);

  }, 2000);

});



module.exports = {};
