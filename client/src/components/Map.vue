<template>
  <div id="map" class="h-full">
    <div v-if="isMapLoaded">
      <MapMarker v-for="room in $store.state.rooms" :key="room.name" :coordinates="room.coordinates" :room="room.name" @create="addMarkerToMap"/> 
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import MapMarker from './MapMarker'

const DEFAULT_COORDINATES = [46.7712, 23.6236]
const DEFAULT_ZOOM = 5

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
    this.initMap()

    // Try set the map center at user location:
    if (!navigator.geolocation) {
      return
    }
    navigator
      .geolocation
      .getCurrentPosition(
        ({ coords: { latitude, longitude} }) => {
          this.map.panTo(new L.LatLng(latitude, longitude))
        },
        () => {
          // User probably doesn't want to share location
        }
      )
  },
  methods: {
    initMap() {
      this.map = L.map('map', {
        // Set latitude and longitude of the map center (required)
        center: DEFAULT_COORDINATES,
        // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
        zoom: DEFAULT_ZOOM
      })

      // Create a Tile Layer and add it to the map
      new L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png').addTo(this.map)
      
      // Setup events:
      this.map.on('click', this.handleMapClick)

      this.isMapLoaded = true
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