/* eslint-disable no-console */
const API_ROOT = 'http://localhost:8081/api'

async function getChatrooms() {
  try {
    const response = await fetch(`${API_ROOT}/chatrooms`)
    const rooms = await response.json()

    return rooms
  } catch(error) {
    console.error(error)
  }
}

async function getRoom(roomName) {
  try {
    const response = await fetch(`${API_ROOT}/chatrooms/${roomName}`)
    const room = await response.json()

    return room;
  } catch (error) {
    console.log(error)
  }
}

async function createRoom(coordinates) {
  try {
    const response = await fetch(`${API_ROOT}/chatrooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(coordinates)
    })

    const createdRoom = await response.json()

    return createdRoom
  } catch(error) {
    console.error(error)
  }
}

export default {
  getChatrooms,
  getRoom,
  createRoom
}