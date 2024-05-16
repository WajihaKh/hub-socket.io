'use strict';

require ('dotenv').config();
// need to add my environment variable from render to replace localhost
const {io} = require('socket.io-client');
const { generateOrder } = require('./handler.js');
const socket = io('http://localhost:3000/caps');

setInterval(() => {
  generateOrder(socket);
}, 1000);

socket.on('delivered', (payload) => {
  console.log(`Vendor received notifcation of delivery for order ${payload.orderId}`);
});