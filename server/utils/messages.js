const messages = {}

function initRoomMessages (roomId) {
  if (messages[roomId]) {
    throw new Error('Room already has conversation!')
  }
  messages[roomId] = []
}

function addMessage (roomId, userName, message) {
  if (!messages[roomId]) {
    throw new Error('Room not found')
  }
  const messageObj = Object.freeze({
    userName,
    message,
    date: new Date()
  })
  messages[roomId].push(messageObj)

  return messageObj
}

function getRoomMessages (roomId) {
  if (messages[roomId]) {
    return messages[roomId]
  }

  throw new Error(`No messages for room: ${roomId}`)
}

module.exports = {
  initRoomMessages,
  addMessage,
  getRoomMessages
}
