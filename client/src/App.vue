<template>
  <div id="app" class="h-screen w-screen">
    <Map />
    <ChatRoom />
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
  }
}
</script>

