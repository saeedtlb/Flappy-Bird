const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

require('dotenv').config();

app.use(express.static(path.join(__dirname, '../', 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'src', 'index.html'));
});

let users = 0;
io.on('connection', socket => {
    users++;
    console.log(`users: ${users} connected`);

    socket.on('position', data => {
        socket.broadcast.emit('players', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        users--;
    });
});

http.listen(process.env.PORT, () =>
    console.log(`Server is up and running at port: ${process.env.PORT}`)
);
