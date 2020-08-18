const API_ROOT = 'http://localhost:8081/api'

async function getChatrooms() {
  const response = await fetch(`${API_ROOT}/chatrooms`)
  const rooms = await response.json()

  return rooms
}

export default {
  getChatrooms,
}