/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [],
    closeRooms: [],
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
    setCloseRooms(state, rooms) {
      state.closeRooms = rooms
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
    async getRoomsCloseToLocation(context, coordinates) {
      try {
        const rooms = await api.getChatrooms(coordinates)
        context.commit('setCloseRooms', rooms)
      } catch(error) {
        console.error(error)
      }
    },
    async loadRooms(context) {
      try {
        const rooms = await api.getChatrooms()
        context.commit('setRooms', rooms)
      } catch(error) {
        console.error(error)
      }
    }
  }
})
