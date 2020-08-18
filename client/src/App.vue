<template>
  <div id="app">
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

<style>
#app {
  height: 100vh;
  width: 100vw;
}
</style>
