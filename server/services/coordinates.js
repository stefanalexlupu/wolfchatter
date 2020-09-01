function checkValidCoordinates (coordinates) {
  if (!coordinates.lat) {
    throw new Error('Coordinates must have a "lat" property!')
  }

  if (!coordinates.lng) {
    throw new Error('Coordinates must have a "lng" property!')
  }

  if (Number.isNaN(coordinates.lat)) {
    throw new Error('The "lat" property of a coordinate must be a number!')
  }

  if (Number.isNaN(coordinates.lng)) {
    throw new Error('The "lng" property of a coordinate must be a number!')
  }
}

function degreeToMetric (valueInDegrees) {
  return valueInDegrees / 111000
}

function metricDistanceBetweenCoordinates (pointA, pointB) {
  checkValidCoordinates(pointA)
  checkValidCoordinates(pointB)

  const { lat: x1, lng: y1 } = pointA
  const { lat: x2, lng: y2 } = pointB

  const diffX = (x1 - x2)
  const diffY = (y1 - y2)

  const distance = Math.sqrt(diffX * diffX + diffY * diffY)

  return degreeToMetric(distance)
}

module.exports = {
  metricDistanceBetweenCoordinates
}
