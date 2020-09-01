const API_ROOT = 'http://localhost:8081/api'

async function getChatrooms(params = {}) {
  const url = new URL(`${API_ROOT}/chatrooms`)
  url.search = new URLSearchParams(params)
  const response = await fetch(url)
  const rooms = await response.json()

  return rooms
}

export default {
  getChatrooms,
}