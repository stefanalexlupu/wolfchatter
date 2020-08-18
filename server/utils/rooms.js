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

module.exports = {
  createRoom,
  getRooms
}
