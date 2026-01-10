/**
 * Generates a GeoJSON polygon approximating a circle at a given center point
 * with a specified radius in miles.
 */

const MILES_TO_KM = 1.60934
const EARTH_RADIUS_KM = 6371

export interface GeoJSONPolygonFeature {
  type: 'Feature'
  properties: Record<string, unknown>
  geometry: {
    type: 'Polygon'
    coordinates: [number, number][][]
  }
}

/**
 * Creates a GeoJSON polygon feature representing a circle
 * @param center - [longitude, latitude] of the circle center
 * @param radiusMiles - Radius in miles
 * @param points - Number of points to use for the polygon (default: 64)
 * @returns GeoJSON Feature with Polygon geometry
 */
export function createCirclePolygon(
  center: [number, number],
  radiusMiles: number,
  points: number = 64
): GeoJSONPolygonFeature {
  const radiusKm = radiusMiles * MILES_TO_KM
  const coords: [number, number][] = []

  const [lng, lat] = center
  const latRad = lat * (Math.PI / 180)

  for (let i = 0; i < points; i++) {
    const angle = (i / points) * 2 * Math.PI

    // Calculate the offset in degrees
    // Latitude: straightforward conversion from km to degrees
    const dLat = (radiusKm / EARTH_RADIUS_KM) * (180 / Math.PI) * Math.cos(angle)

    // Longitude: need to account for latitude (circles get smaller near poles)
    const dLng = (radiusKm / EARTH_RADIUS_KM) * (180 / Math.PI) * Math.sin(angle) / Math.cos(latRad)

    coords.push([lng + dLng, lat + dLat])
  }

  // Close the polygon by repeating the first point
  coords.push(coords[0])

  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [coords]
    }
  }
}
