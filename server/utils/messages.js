const messages = {}

function initRoomMessages (roomName) {
  if (messages[roomName]) {
    throw new Error('Room already has conversation!')
  }
  messages[roomName] = []
}

function addMessage (roomName, userName, message) {
  if (!messages[roomName]) {
    throw new Error('Room not found')
  }
  const messageObj = Object.freeze({
    userName,
    message,
    date: new Date()
  })
  messages[roomName].push(messageObj)

  return messageObj
}

function getRoomMessages (roomName) {
  if (messages[roomName]) {
    return messages[roomName]
  }

  throw new Error(`No messages for room: ${roomName}`)
}

module.exports = {
  initRoomMessages,
  addMessage,
  getRoomMessages
}
