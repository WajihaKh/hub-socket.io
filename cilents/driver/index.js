'use strict';

const {io} = require('socket.io-client');
const socket = io('http://localhost:3000/caps');

socket.on('pickup', (payload) => {
  setTimeout(() => {
    console.log('Driver has picked up package');
    socket.emit('in-transit', payload);

  }, 1000);
});

module.exports = {};
