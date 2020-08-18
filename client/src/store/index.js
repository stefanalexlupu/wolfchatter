/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [],
    activeRoom: '',
    messages: []
  },
  mutations: {
    addRoom(state, room) {
      state.rooms.push(room)
    },
    setRooms(state, rooms) {
      state.rooms = rooms
    },
    setRoom(state, roomName) {
      state.activeRoom = roomName
    },
    setMessages(state, messages) {
      state.messages = messages
    },
    addMessage(state, message) {
      state.messages.push(message)
    }
  },
  actions: {
    'SOCKET_new-room'(context, room) {
      context.commit('addRoom', room)
    },
    'SOCKET_join-chatroom'(context, room) {
      context.commit('setMessages', room.messages)
      context.commit('setRoom', room.roomName)
    },
    'SOCKET_new-message'(context, message) {
      context.commit('addMessage', message)
    },
    async loadRooms(context) {
      try {
        const rooms = await api.getChatrooms()
        context.commit('setRooms', rooms)
      } catch(error) {
        console.error(error)
      }
    },
    async selectRoom(context, roomName) {
      try {
        const room = await api.getRoom(roomName)
        context.commit('setMessages', room.messages);
        context.commit('setRoom', room.chatroomName)
      } catch(error) {
        console.error(error)
      }
    }
  }
})
