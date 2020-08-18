const express = require('express')
const cors = require('cors')
const { getRooms, createRoom } = require('./utils/rooms')
const { initRoomMessages, getRoomMessages, addMessage } = require('./utils/messages')
const { addUser, getUser, removeUser } = require('./utils/users')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(cors())

app.get('/api/chatrooms', (req, res) => {
  res.set(200).send(getRooms())
})

io.on('connection', socket => {
  socket.on('new-chatroom', (coordinates) => {
    const room = createRoom(coordinates)
    initRoomMessages(room.name)
    io.emit('new-room', room)

    // Add user to new room
    socket.join(room.name)
    addUser(socket.id, room.name)
    socket.emit('join-chatroom', {
      roomName: room.name,
      messages: getRoomMessages(room.name)
    })
  })
  socket.on('join-chatroom', (roomName) => {
    socket.join(roomName)
    addUser(socket.id, roomName)

    try {
      socket.emit('join-chatroom', {
        roomName,
        messages: getRoomMessages(roomName)
      })
    } catch (error) {
      console.error(error)
    }
  })

  socket.on('leave-chatroom', () => {
    const room = getUser(socket.id)
    socket.leave(room)
    removeUser(socket.id)
  })

  socket.on('disconnect', () => {
    removeUser(socket.id)
  })

  socket.on('chat-message', ({ userName, message }) => {
    const room = getUser(socket.id)
    const createdMessage = addMessage(room, userName, message)

    io.to(room).emit('new-message', createdMessage)
  })
})

server.listen('8081', () => {
  console.log('listening on port 8081')
})
