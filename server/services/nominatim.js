const nominatim = require('axios').default.create({
  baseURL: 'https://nominatim.openstreetmap.org'
})

module.exports = {
  reverse: async function test (lat, lon) {
    try {
      const { data } = await nominatim.get('/reverse', {
        params: {
          format: 'json',
          lat: lat,
          lon: lon
        }
      })

      return data
    } catch (reason) {
      return Promise.reject(reason)
    }
  }
}
