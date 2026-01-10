/**
 * Geographic distance calculation utilities using the Haversine formula
 */

const EARTH_RADIUS_MILES = 3959

/**
 * Calculates the distance between two coordinates using the Haversine formula
 * @param coord1 - [longitude, latitude] of the first point
 * @param coord2 - [longitude, latitude] of the second point
 * @returns Distance in miles
 */
export function haversineDistance(
  coord1: [number, number],
  coord2: [number, number]
): number {
  const [lng1, lat1] = coord1
  const [lng2, lat2] = coord2

  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180

  const lat1Rad = lat1 * Math.PI / 180
  const lat2Rad = lat2 * Math.PI / 180

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return EARTH_RADIUS_MILES * c
}

export interface NearbyTown {
  name: string
  coords: [number, number]
  distance: number
}

/**
 * Finds all towns within a given radius of a center town
 * @param centerTown - Name of the center town
 * @param townCoordinates - Record mapping town names to coordinates
 * @param radiusMiles - Radius to search within (default: 2 miles)
 * @returns Array of nearby towns with their coordinates and distances
 */
export function findNearbyTowns(
  centerTown: string,
  townCoordinates: Record<string, [number, number]>,
  radiusMiles: number = 2
): NearbyTown[] {
  const centerCoords = townCoordinates[centerTown]
  if (!centerCoords) return []

  return Object.entries(townCoordinates)
    .filter(([name]) => name !== centerTown)
    .map(([name, coords]) => ({
      name,
      coords,
      distance: haversineDistance(centerCoords, coords)
    }))
    .filter(town => town.distance <= radiusMiles)
    .sort((a, b) => a.distance - b.distance)
}
