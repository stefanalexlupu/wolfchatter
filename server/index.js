const express = require('express')
const cors = require('cors')
const { getRooms, createRoom, joinRoom } = require('./utils/rooms')
const { initRoomMessages, addMessage } = require('./utils/messages')
const { getUser, removeUser } = require('./utils/users')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(cors())

app.get('/api/chatrooms', (req, res) => {
  res.set(200).send(getRooms())
})

io.on('connection', socket => {
  socket.on('new-chatroom', async (coordinates) => {
    try {
      const room = await createRoom(coordinates)
      initRoomMessages(room.id)
      io.emit('new-room', room)

      // Add user to new room
      joinRoom(socket, room.id)
    } catch (error) {
      console.log(error)
    }
  })
  socket.on('join-chatroom', (roomId) => {
    joinRoom(socket, roomId)
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
    try {
      const createdMessage = addMessage(room, userName, message)
      io.to(room).emit('new-message', createdMessage)
    } catch (error) {
      console.error(`Failed to add message in room: ${room}\n`, error)
    }
  })
})

server.listen('8081', () => {
  console.log('listening on port 8081')
})
