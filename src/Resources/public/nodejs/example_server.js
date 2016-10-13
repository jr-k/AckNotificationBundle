var
    io                   = require('socket.io'),
    http                 = require('http'),
    notificationListener = require('./listener/notificationListener');

server = http.createServer();
server.listen(1337, "127.0.0.1");

io = io.listen(server);

io.on('connection', function (socket) {
    'use strict';

    var socketActions = notificationListener.getSocketActions();

    for (var action in socketActions) {
        if (socketActions.hasOwnProperty(action)) {
            socket.on(action, socketActions[action].bind(socketActions, socket));
        }
    }
});

server.once('listening', function () {
    console.log('Socket.io listening');

    notificationListener.listen(io);
});