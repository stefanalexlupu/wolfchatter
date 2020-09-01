/* eslint-disable camelcase */

const addUser = require('./users').addUser
const getRoomMessages = require('./messages').getRoomMessages
const { reverse } = require('../services/nominatim')
const { metricDistanceBetweenCoordinates } = require('../services/coordinates')

const rooms = {}

async function createRoom (coordinates) {
  let placeId, displayName
  try {
    const { place_id, display_name, name } = await reverse(coordinates.lat, coordinates.lng)
    placeId = place_id
    displayName = name || display_name
  } catch (error) {
    console.log(error)
    return Promise.reject(new Error('Cannot find location'))
  }

  let room = getRoom(placeId)

  if (room) {
    return room
  }
  room = Object.freeze({
    name: displayName,
    id: placeId,
    coordinates
  })
  rooms[placeId] = room

  console.log('createdRoom: ', room.coordinates)
  return room
}

function getRoom (roomId) {
  for (const id in rooms) {
    if (id === roomId) {
      return rooms[id]
    }
  }

  return null
}

function getRooms () {
  return Object.values(rooms)
}

function getRoomsCloseTo (coordinates, radius) {
  const rooms = getRooms()

  return rooms.filter(({ coordinates: roomCoordinates }) => {
    console.log('checking ', roomCoordinates)
    console.log('\t distance to ', coordinates)
    const distance = metricDistanceBetweenCoordinates(coordinates, roomCoordinates)
    console.log('\t', distance)

    return distance <= radius
  })
}

function joinRoom (socket, roomId) {
  socket.join(roomId)
  addUser(socket.id, roomId)

  try {
    socket.emit('join-chatroom', {
      roomName: rooms[roomId].name,
      messages: getRoomMessages(roomId)
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  createRoom,
  getRooms,
  joinRoom,
  getRoomsCloseTo
}
