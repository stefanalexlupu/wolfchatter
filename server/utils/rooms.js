const addUser = require('./users').addUser
const getRoomMessages = require('./messages').getRoomMessages

const rooms = []
let roomIndex = 0

function createRoom (coordinates) {
  // TODO: MAKE SURE ROOM DOES NOT EXIST FOR THE COORDINATES YET!

  const room = Object.freeze({
    name: `chatroom-${++roomIndex}`,
    coordinates
  })
  rooms.push(room)
  return room
}

function getRooms () {
  return [...rooms]
}

function joinRoom (socket, roomName) {
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
}

module.exports = {
  createRoom,
  getRooms,
  joinRoom
}
