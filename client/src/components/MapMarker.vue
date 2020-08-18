<script>
import L from 'leaflet'
export default {
  render: () => null,
  
  props: {
    coordinates: Object,
    room: String
  },

  mounted() {
    this.marker = L.marker(this.coordinates)
    this.marker.on('click', () => {
      this.$socket.emit('leave-chatroom')
      this.$socket.emit('join-chatroom', this.room)
    })
    this.$emit('create', this.marker)
  },

  beforeDestroy() {
    this.$emit('remove', this.marker)
  }

}
</script>

<style>

</style>