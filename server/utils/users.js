const users = {}

function addUser (id, room) {
  users[id] = room
  return room
}

function removeUser (id) {
  const user = users[id]
  delete users[id]

  return user
}

function getUser (id) {
  return users[id]
}

module.exports = {
  addUser,
  removeUser,
  getUser
}
