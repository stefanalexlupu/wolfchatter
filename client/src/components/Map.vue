<template>
  <div id="map" style="height: 100vh">
    <div v-if="isMapLoaded">
      <MapMarker v-for="room in $store.state.rooms" :key="room.name" :coordinates="room.coordinates" :room="room.name" @create="addMarkerToMap"/> 
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import MapMarker from './MapMarker'
export default {
  components: {
    MapMarker
  },
  data() {
    return {
      map: null,
      isMapLoaded: false
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    this.initMap()
    this.isMapLoaded = true
  },
  methods: {
    initMap() {
      this.map = L.map('map', {
        // Set latitude and longitude of the map center (required)
        center: [46.7712, 23.6236],
        // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
        zoom: 5
      })

      // Create a Tile Layer and add it to the map
      new L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png').addTo(this.map);
      
      // Setup events:
      this.map.on('click', this.handleMapClick)
    },
    handleMapClick(event) {
      this.$socket.emit('new-chatroom', event.latlng)
    },
    addMarkerToMap(marker) {
      marker.addTo(this.map)
    }
  }
}
</script>

<style>

</style>