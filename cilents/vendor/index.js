'use strict';

require ('dotenv').config();
// need to add my environment variable from render to replace localhost
const {io} = require('socket.io-client');
const { generateOrder } = require('./handler.js');
const socket = io(process.env.RENDER_URL);

setInterval(() => {
  generateOrder(socket);
}, 10000);