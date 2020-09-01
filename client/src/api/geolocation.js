export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject('Geolocation is not supported on browser')
    }
    navigator
      .geolocation
      .getCurrentPosition(
        ({coords: { latitude, longitude}}) => {
          resolve({ lat: latitude, lng: longitude})
        },
        () => {
          reject('Failed to get location. Please allow location services for this app in the browser settings')
        }
      )
  })
}