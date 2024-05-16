'use strict';

require('dotenv').config();
const {Server} = require('socket.io');
const io = new Server();
const PORT = process.env.PORT || 3000;
const caps = io.of('/caps');

const Queue = require('./queue.js');
const orders = new Queue();

io.on('connection', handleConnection);

function handlePickup(payload, socket) {
  console.log('The pickup was requested', payload.orderId);
  // socket.emit('received', {message:'Pickup acknowledged'});
  payload.status = 'queued for pickup';
  orders.enqueue(payload);
  console.log(orders.length());
  // caps.emit('pickup', payload);
}

function handleInTransit(payload, socket) {
  console.log('payload ', payload);
  console.log(`Order ${payload.orderId} is in-transit`);
  caps.emit('in-transit', payload);
}

function handleDelivered(payload, socket) {
  console.log(`Order ${payload.orderId} has been delivered`);
  caps.emit('delivered', payload);
}


function handleConnection(socket) {

  socket.on('driver-ready', () => {
    let nextOrder = orders.dequeue();
    if (nextOrder) {
      console.log('HUB: Sending order to driver', nextOrder);
      console.log('Orders in the queue:', orders.length());
      socket.emit('pickup', nextOrder);
    } else {
      console.log('HUB: No orders in queue');
    }
  });

  socket.on('pickup', handlePickup);
  socket.on('in-transit', handleInTransit);
  socket.on('delivered', handleDelivered);
}

function startServer() {
  console.log('The server has been started');
  caps.on('connection', handleConnection);
}

io.listen(PORT);

module.exports = { startServer};