const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

server.listen(3000, () => {
    console.log('Máy chủ đang chạy trên cổng 3000');
});

let userCount = 0; 

io.on('connection', (socket) => {
    userCount++; 
    const userId = userCount; 

    socket.on('chat message', (msg) => {
        io.emit('chat message', `Người dùng ${userId}: ${msg}`);
    });

    socket.on('disconnect', () => {
        userCount--;
        console.log(`Người dùng ${userId} đã ngắt kết nối`);
    });
});
