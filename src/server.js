const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(4000, () => {
    console.log('listening to requests on port 4000');
});

app.use(express.static('.\\src\\public'));

//Socket Setup

const io = socket(server);


io.on('connection', (socket) => {
    console.log('socket running on new connection');
    console.log(`made socket connection ${socket.id}`);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
});

