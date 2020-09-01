<template>
  <div id="app" class="h-screen w-screen">
    <Map />
    <ChatRoom>
      <div v-if="$store.state.closeRooms.length">
        <ul>
          <li
            class="truncate cursor-pointer hover:bg-gray-200 p-2 rounded"
            v-for="room in $store.state.closeRooms"
            :key="room.id"
            @click="(event) => onRoomSelect(event, room)"
          >
              {{ room.name }}
          </li>
        </ul>
      </div>
      <p v-else slot="default" class="font-bold">Click on the map to start a chat</p>
    </ChatRoom>
  </div>
</template>

<script>
import Map from './components/Map'
import ChatRoom from './components/ChatRoom'

export default {
  name: 'app',
  components: {
    Map,
    ChatRoom
  },

  mounted() {
    this.$store.dispatch('loadRooms')
  },

  methods: {
    onRoomSelect(event, room) {
      this.$socket.emit('join-chatroom', room.id)
    }
  }
}
</script>

