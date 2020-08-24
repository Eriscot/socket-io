const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

io.on('connection', socket => {
    io.emit('user connected');
    socket.on('disconnect', () => io.emit('user disconnected'));
    socket.on('chat message', msg => io.emit('chat message', msg));
});

http.listen(3000, () => console.log('Listening on :3000'));