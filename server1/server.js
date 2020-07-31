const express = require('express');
const http = require('http')
const socketio = require('socket.io');
// const formatMessage = require('./utlis/messages');
const formatMessages = require('./utlis/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utlis/users');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = 'WeChat-Bot'
io.on('connection', socket => {

    // To join room
    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        // Welcome message
        socket.emit('message', formatMessages(botName, 'Welcome to WeChat!'))

        // To bradcast every user who has connected!!
        socket.broadcast.to(user.room).emit('message', formatMessages(botName, `${user.username} has joined!`))

        // Send users and room
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })

    })

    // Listen for chatMesages
    socket.on('chatMessage', (msg) => {
        // console.log(msg)
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessages(user.username, msg))
    })

    // This is for left the chat 
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit('message', formatMessages(botName, ` ${user.username} has left the chat!`))
            // Send users and room
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }

    })

})

server.listen(port, () => console.log(
    `Server is running on port ${port}`
))