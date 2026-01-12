export interface ColVideo {
  youtubeId: string
  source: 'col-collective' | 'tour-de-france' | 'other'
  title?: string
}

export interface Col {
  name: string
  elevation: number
  length?: number
  avgGrade?: number
  maxGrade?: number
  description?: string
  tourAppearances?: number
  firstCrossed?: number
  video?: ColVideo
}

export interface DayStage {
  day: number
  date: string // Format: DD/MM/YYYY
  start: string
  finish: string
  distance: number
  elevation: number
  description: string
  cols: Col[]
  highlights: string[]
  rideWithGPSEmbed?: string
  isTransitDay?: boolean
  coordinates?: {
    start: [number, number]
    end: [number, number]
  }
}

export interface RouteStats {
  totalDistance: number
  totalElevation: number
  totalDays: number
  ridingDays: number
  highestPoint: number
  lowestPoint: number
  startDate: string
  endDate: string
}

export const routeStats: RouteStats = {
  totalDistance: 763,
  totalElevation: 17360,
  totalDays: 8,
  ridingDays: 6,
  highestPoint: 2802,
  lowestPoint: 0,
  startDate: '11/07/2026',
  endDate: '18/07/2026',
}

export const days: DayStage[] = [
  {
    day: 0,
    date: '11/07/2026',
    start: 'UK',
    finish: 'Thonon-les-Bains',
    distance: 0,
    elevation: 0,
    description: 'Travel day to reach the starting point at Thonon-les-Bains on the shores of Lake Geneva. Assemble bikes and prepare for the adventure ahead.',
    cols: [],
    highlights: ['Arrive at Lake Geneva'],
    isTransitDay: true,
  },
  {
    day: 1,
    date: '12/07/2026',
    start: 'Thonon-les-Bains',
    finish: 'La Clusaz',
    distance: 110,
    elevation: 2550,
    description: 'Warm up from Lake Geneva through pine forests. A challenging opening day with five cols to conquer.',
    cols: [
      { name: 'Col des Moises', elevation: 1118, length: 5.2, avgGrade: 4.8 },
      { name: 'Col de Terramont', elevation: 1080, length: 2.7, avgGrade: 5.9 },
      { name: 'Col de Jambaz', elevation: 1027, length: 13.2, avgGrade: 3.6 },
      { name: 'Col de la Ramaz', elevation: 1557, length: 14.0, avgGrade: 7.0, maxGrade: 12.0, description: 'A tough first-category climb with irregular gradients through the Gorges du Foron.' },
      { name: 'Col de la Colombiere', elevation: 1613, length: 11.8, avgGrade: 5.9, maxGrade: 10.4, description: 'A beautiful introduction to Alpine climbing with consistent gradients through alpine meadows.', tourAppearances: 22 },
    ],
    highlights: ['Lake Geneva views', 'Pine forest climbs', 'Alpine villages'],
    rideWithGPSEmbed: 'https://ridewithgps.com/embeds?type=route&id=52996180&metricUnits=true&sampleGraph=true&distanceMarkers=true&privacyCode=c3s2xgryfW4I5TWXsIxRyxyLLGJM4DpM',
    coordinates: {
      start: [6.4793, 46.3706],
      end: [6.4249, 45.9046],
    },
  },
  {
    day: 2,
    date: '13/07/2026',
    start: 'La Clusaz',
    finish: 'Sainte-Foy-Tarentaise',
    distance: 109,
    elevation: 3150,
    description: 'Through famous Alpine areas with a spectacular 26km descent to Bourg-Saint-Maurice. Welcome to Beaufort cheese country.',
    cols: [
      { name: 'Col des Aravis', elevation: 1487, length: 10.3, avgGrade: 5.0, maxGrade: 7.5, description: 'A classic Tour de France climb with stunning views of Mont Blanc.', tourAppearances: 42 },
      { name: 'Col de Saisies', elevation: 1633, length: 14.6, avgGrade: 6.0, maxGrade: 8.0, description: 'A first-category climb through beautiful Beaufortain countryside.', tourAppearances: 14 },
      { name: 'Col du Pré', elevation: 1740, length: 12.2, avgGrade: 7.9, maxGrade: 10.6, description: 'A brutal HC climb with killer percentages around 10% in the final 5km.', tourAppearances: 3 },
      {
        name: 'Cormet de Roselend',
        elevation: 1968,
        length: 19.9,
        avgGrade: 6.1,
        maxGrade: 9.0,
        description: 'One of the most scenic climbs in the Alps with its stunning reservoir views.',
        tourAppearances: 7,
      },
    ],
    highlights: ['Beaufort cheese country', 'Roselend Dam views', '26km descent'],
    rideWithGPSEmbed: 'https://ridewithgps.com/embeds?type=route&id=52996303&metricUnits=true&sampleGraph=true&distanceMarkers=true&privacyCode=J3eufVyErGiYV10wsDc1nqXJ1s5N2WTI',
    coordinates: {
      start: [6.4249, 45.9046],
      end: [6.8807, 45.5842],
    },
  },
  {
    day: 3,
    date: '14/07/2026',
    start: 'Sainte-Foy-Tarentaise',
    finish: 'Valloire',
    distance: 129,
    elevation: 3060,
    description: 'The mighty Iseran awaits - a 36km climb to one of the highest paved passes in the Alps at 2,770m.',
    cols: [
      {
        name: "Col de l'Iseran",
        elevation: 2770,
        length: 36,
        avgGrade: 4.5,
        maxGrade: 9.5,
        description: 'The highest paved pass in the Alps. A relentless 36km climb from the valley floor.',
        tourAppearances: 9,
        firstCrossed: 1938,
      },
      { name: "Côte d'Aussois", elevation: 1519, length: 4.5, avgGrade: 6.2 },
      { name: 'Col du Télégraphe', elevation: 1566, length: 11.8, avgGrade: 7.1, maxGrade: 9.8, description: 'A steady first-category climb often used as a warm-up for the Galibier.', tourAppearances: 38 },
    ],
    highlights: ['Highest paved pass in Alps', '36km epic climb', 'Maurienne Valley'],
    rideWithGPSEmbed: 'https://ridewithgps.com/embeds?type=route&id=53643775&metricUnits=true&sampleGraph=true&distanceMarkers=true&privacyCode=ujLMaMNzIOmBFwEZYy2XGiEZWlY1tsen',
    coordinates: {
      start: [6.8807, 45.5842],
      end: [6.4283, 45.1647],
    },
  },
  {
    day: 4,
    date: '15/07/2026',
    start: 'Valloire',
    finish: 'Vars',
    distance: 121,
    elevation: 3200,
    description: 'Legendary Tour de France climbs. The Galibier with its brutal 10% final kilometre, followed by the historic Izoard.',
    cols: [
      {
        name: 'Col du Galibier',
        elevation: 2642,
        length: 18.1,
        avgGrade: 6.9,
        maxGrade: 10.1,
        description: 'One of the most iconic climbs in cycling. Featured in Tour de France since 1911.',
        tourAppearances: 61,
        firstCrossed: 1911,
      },
      {
        name: "Col d'Izoard",
        elevation: 2361,
        length: 19.2,
        avgGrade: 5.9,
        maxGrade: 9.0,
        description: 'Home to the famous Casse Déserte moonscape and monuments to Coppi and Bobet.',
        tourAppearances: 35,
        firstCrossed: 1922,
      },
      { name: 'Col de Vars', elevation: 2109, length: 18.9, avgGrade: 5.9, maxGrade: 9.9, description: 'A first-category climb with a tiered ascent through the resort of Vars.', tourAppearances: 35, firstCrossed: 1922 },
    ],
    highlights: ['Tour de France legends', 'Coppi & Bobet monuments', 'Casse Déserte'],
    coordinates: {
      start: [6.4283, 45.1647],
      end: [6.6892, 44.5603],
    },
  },
  {
    day: 5,
    date: '16/07/2026',
    start: 'Vars',
    finish: 'Valberg',
    distance: 134,
    elevation: 3400,
    description: 'The highest paved road in Europe! Cime de la Bonette at 2,802m followed by an incredible 53km descent.',
    cols: [
      { name: 'Col de Vars summit', elevation: 2105, length: 9.5, avgGrade: 6.8, description: 'The northern descent and re-climb of Col de Vars from Saint-Paul-sur-Ubaye.' },
      {
        name: 'Cime de la Bonette',
        elevation: 2802,
        length: 23,
        avgGrade: 6.5,
        maxGrade: 10.5,
        description: 'The highest paved road in Europe. A 23km climb followed by a legendary 53km descent.',
        tourAppearances: 6,
        firstCrossed: 1962,
      },
      { name: 'Col de la Couillole', elevation: 1678, length: 16.0, avgGrade: 7.3, maxGrade: 8.0, description: 'An HC climb that was the finishing climb for stage 20 of the 2024 Tour de France.' },
    ],
    highlights: ['Highest paved road in Europe', '53km descent', 'Alpine to Mediterranean transition'],
    rideWithGPSEmbed: 'https://ridewithgps.com/embeds?type=route&id=52996577&metricUnits=true&sampleGraph=true&distanceMarkers=true&privacyCode=6FMpVykvtbdBBVOtUREUzMoSuOIoP6j4',
    coordinates: {
      start: [6.6892, 44.5603],
      end: [6.9317, 44.0858],
    },
  },
  {
    day: 6,
    date: '17/07/2026',
    start: 'Valberg',
    finish: 'Nice',
    distance: 160,
    elevation: 2000,
    description: 'The finale! Scenery transforms from alpine to Mediterranean as you descend to the Côte d\'Azur.',
    cols: [
      { name: 'Gorges du Cians', elevation: 0, description: 'Spectacular red rock gorge carved by the Cians river - a scenic passage rather than a climb.' },
      { name: 'Col de Saint-Raphaël', elevation: 876, length: 8.5, avgGrade: 4.2, description: 'A gentle warm-up col in the pre-Alps.' },
      { name: 'Col de Bleine', elevation: 1439, length: 5.1, avgGrade: 6.1, maxGrade: 7.5, description: 'A short but steady climb through the limestone plateaus of the Provencal Alps.' },
      { name: 'Col du Pilon', elevation: 786, length: 6.8, avgGrade: 3.8, description: 'The final col before the Mediterranean descent into Nice.' },
    ],
    highlights: ['Mediterranean arrival', 'Gorges du Cians', 'Nice seafront finish'],
    rideWithGPSEmbed: 'https://ridewithgps.com/embeds?type=route&id=52996614&metricUnits=true&sampleGraph=true&distanceMarkers=true&privacyCode=yxGoz5vz4xvCIi8BtCLX6mfM60wOaDEl',
    coordinates: {
      start: [6.9317, 44.0858],
      end: [7.2620, 43.7102],
    },
  },
  {
    day: 7,
    date: '18/07/2026',
    start: 'Nice',
    finish: 'UK',
    distance: 0,
    elevation: 0,
    description: 'Return travel day. Disassemble bikes and depart from Nice.',
    cols: [],
    highlights: ['Celebration in Nice', 'Return travel', 'Mission accomplished'],
    isTransitDay: true,
  },
]

// Get only riding days (non-transit)
export const ridingDays = days.filter(day => !day.isTransitDay)

// Extract all unique cols for the cols page
export const allCols: Col[] = ridingDays.flatMap(day => day.cols).filter(col => col.elevation > 0)

// Featured col interface with additional properties
export interface FeaturedCol extends Col {
  day: number
  image?: string
  video?: ColVideo
}

// Featured cols (the legendary ones)
export const featuredCols: FeaturedCol[] = [
  {
    name: "Col de l'Iseran",
    elevation: 2770,
    length: 36,
    avgGrade: 4.5,
    maxGrade: 9.5,
    description: 'The highest paved pass in the Alps. A relentless 36km climb from the valley floor through the Vanoise National Park.',
    tourAppearances: 9,
    firstCrossed: 1938,
    day: 3,
    image: '/images/cols/iseran.jpg',
    video: {
      youtubeId: '8oZPlxP1UNU',
      source: 'col-collective',
      title: "Col de l'Iseran - The Col Collective",
    },
  },
  {
    name: 'Col du Galibier',
    elevation: 2642,
    length: 18.1,
    avgGrade: 6.9,
    maxGrade: 10.1,
    description: 'One of the most iconic climbs in cycling history. The brutal final kilometre at 10% grade has broken countless riders.',
    tourAppearances: 61,
    firstCrossed: 1911,
    day: 4,
    image: '/images/cols/galibier.jpg',
    video: {
      youtubeId: '1hDj23a9y1c',
      source: 'col-collective',
      title: 'Col du Galibier - The Col Collective',
    },
  },
  {
    name: 'Cime de la Bonette',
    elevation: 2802,
    length: 23,
    avgGrade: 6.5,
    maxGrade: 10.5,
    description: 'The highest paved road in Europe at 2,802m. The loop at the summit offers breathtaking 360° views of the Maritime Alps.',
    tourAppearances: 6,
    firstCrossed: 1962,
    day: 5,
    image: '/images/cols/bonette.jpg',
    video: {
      youtubeId: 'QlRrAeO7aIM',
      source: 'col-collective',
      title: 'Col de la Bonette - The Col Collective',
    },
  },
  {
    name: "Col d'Izoard",
    elevation: 2361,
    length: 19.2,
    avgGrade: 5.9,
    maxGrade: 9.0,
    description: 'Famous for the otherworldly Casse Déserte moonscape near the summit. Monuments honour cycling legends Coppi and Bobet.',
    tourAppearances: 35,
    firstCrossed: 1922,
    day: 4,
    image: '/images/cols/izoard.jpg',
    video: {
      youtubeId: 'HVBWY7TjtPw',
      source: 'col-collective',
      title: "Col d'Izoard - The Col Collective",
    },
  },
  {
    name: 'Cormet de Roselend',
    elevation: 1968,
    length: 19.9,
    avgGrade: 6.1,
    maxGrade: 9.0,
    description: 'One of the most scenic climbs in the Alps, featuring the stunning turquoise Roselend reservoir and dramatic mountain backdrop.',
    tourAppearances: 7,
    day: 2,
    image: '/images/cols/roselend.jpg',
    video: {
      youtubeId: 'IwJMlMfs5bI',
      source: 'col-collective',
      title: 'Cormet de Roselend via Col du Pré - The Col Collective',
    },
  },
  {
    name: 'Col de la Colombiere',
    elevation: 1613,
    length: 11.8,
    avgGrade: 5.9,
    maxGrade: 10.4,
    description: 'A beautiful introduction to Alpine climbing. Regular Tour de France fixture with consistent gradients through alpine meadows.',
    tourAppearances: 22,
    day: 1,
    image: '/images/cols/colombiere.jpg',
    // No Col Collective video available
  },
]

// Download format types
export interface DownloadFormat {
  id: 'gpx'
  name: string
  icon: string
  description: string
  compatibleWith: string[]
  color: 'alpine'
}

export const downloadFormats: DownloadFormat[] = [
  {
    id: 'gpx',
    name: 'GPX',
    icon: 'mdi:map-marker-path',
    description: 'Universal GPS format compatible with most apps and devices',
    compatibleWith: ['Strava', 'Komoot', 'Garmin Connect', 'Wahoo', 'RideWithGPS'],
    color: 'alpine'
  }
]

export function getDownloadPath(day: number, format: 'gpx'): string {
  return `downloads/routes/${format}/RAID_Alpine_Day_${day}.${format}`
}

export function hasDownload(day: number): boolean {
  // Day 3 not yet available - returns false for placeholder state
  return [1, 2, 4, 5, 6].includes(day)
}

export function isComingSoon(day: number): boolean {
  // Day 3 route is not yet complete
  return day === 3
}

// Route coordinates for map (riding days only)
export const routeCoordinates: [number, number][] = [
  [6.4793, 46.3706], // Thonon-les-Bains
  [6.4249, 45.9046], // La Clusaz
  [6.8807, 45.5842], // Sainte-Foy-Tarentaise
  [6.4283, 45.1647], // Valloire
  [6.6892, 44.5603], // Vars
  [6.9317, 44.0858], // Valberg
  [7.2620, 43.7102], // Nice
]

// Town name to coordinates mapping for accommodation maps (town centers)
export const townCoordinates: Record<string, [number, number]> = {
  'Thonon-les-Bains': [6.4793, 46.3706],
  'La Clusaz': [6.4269151, 45.9063723],
  'Sainte-Foy-Tarentaise': [6.8833, 45.5833],
  'Valloire': [6.4283, 45.1647],
  'Vars': [6.6700, 44.5600],
  'Valberg': [6.9283, 44.0925],
  'Nice': [7.2620, 43.7102],
}

// Accommodation data
export interface Accommodation {
  day: number
  town: string
  name: string
  type?: 'hotel' | 'hostel' | 'guesthouse' | 'apartment'
  address?: string
  contact?: string
  notes?: string
  bookingUrl?: string
  bookingId?: string
}

export const accommodations: Accommodation[] = [
  {
    day: 0,
    town: 'Thonon-les-Bains',
    name: 'TBC',
    bookingId: 'TBC',
  },
  {
    day: 1,
    town: 'La Clusaz',
    name: 'Hôtel La Montagne',
    type: 'hotel',
    address: '9 Route de la Piscine',
    bookingUrl: 'https://www.booking.com/Share-YDH7ZL',
    bookingId: 'TBC',
  },
  {
    day: 2,
    town: 'Sainte-Foy-Tarentaise',
    name: 'TBC',
    bookingId: 'TBC',
  },
  {
    day: 3,
    town: 'Valloire',
    name: 'TBC',
    bookingId: 'TBC',
  },
  {
    day: 4,
    town: 'Vars',
    name: 'TBC',
    bookingId: 'TBC',
  },
  {
    day: 5,
    town: 'Valberg',
    name: 'TBC',
    bookingId: 'TBC',
  },
  {
    day: 6,
    town: 'Nice',
    name: 'TBC',
    bookingId: 'TBC',
  },
]

// Day 1 route coordinates (Thonon-les-Bains to La Clusaz)
// Extracted from GPX, sampled for performance
export const day1RouteCoordinates: [number, number][] = [
  [6.47672,46.37505],[6.47967,46.37429],[6.48174,46.37107],[6.48206,46.36803],[6.48078,46.36377],
  [6.47817,46.35911],[6.47602,46.3558],[6.47718,46.35256],[6.47734,46.34679],[6.47692,46.34264],
  [6.47841,46.3366],[6.47537,46.33237],[6.47446,46.32261],[6.47924,46.31437],[6.47417,46.30823],
  [6.46405,46.30411],[6.46371,46.30033],[6.4695,46.30219],[6.46789,46.29951],[6.47386,46.30044],
  [6.46894,46.29768],[6.47389,46.29627],[6.47583,46.28895],[6.47233,46.28428],[6.47192,46.28327],
  [6.47124,46.2819],[6.46764,46.27799],[6.46721,46.27006],[6.46811,46.26666],[6.4749,46.26028],
  [6.4714,46.2569],[6.4754,46.24746],[6.47524,46.24283],[6.47677,46.24126],[6.48381,46.24374],
  [6.49673,46.25008],[6.50371,46.25214],[6.51064,46.253],[6.51319,46.24764],[6.51598,46.24019],
  [6.5191,46.23687],[6.51539,46.22939],[6.51183,46.2239],[6.50322,46.21505],[6.49815,46.2002],
  [6.50276,46.19846],[6.50447,46.19289],[6.50348,46.18767],[6.50417,46.18368],[6.50536,46.17766],
  [6.50771,46.17467],[6.50343,46.17174],[6.49745,46.16945],[6.49152,46.16247],[6.49557,46.16164],
  [6.5027,46.1566],[6.50848,46.15225],[6.50937,46.15489],[6.51495,46.15536],[6.51358,46.15712],
  [6.52054,46.15625],[6.52515,46.15652],[6.52602,46.15827],[6.52366,46.16067],[6.53174,46.15991],
  [6.53589,46.15985],[6.54371,46.15851],[6.54966,46.1598],[6.55237,46.16388],[6.56077,46.16866],
  [6.56662,46.16452],[6.57404,46.16288],[6.57654,46.16264],[6.57978,46.15973],[6.57953,46.15529],
  [6.57985,46.14893],[6.58647,46.1469],[6.59141,46.14424],[6.59766,46.14302],[6.60721,46.14064],
  [6.60888,46.14197],[6.61022,46.14244],[6.612,46.14082],[6.61259,46.14471],[6.61327,46.14849],
  [6.61536,46.14219],[6.62057,46.1377],[6.62295,46.13648],[6.62743,46.13422],[6.62446,46.1322],
  [6.62121,46.12367],[6.61252,46.12028],[6.60468,46.11843],[6.60194,46.11418],[6.59894,46.11093],
  [6.59907,46.10928],[6.5938,46.10821],[6.59083,46.10529],[6.5921,46.0965],[6.59883,46.09589],
  [6.58669,46.09252],[6.5834,46.0884],[6.57566,46.08502],[6.56924,46.08581],[6.57285,46.08394],
  [6.58182,46.08174],[6.58413,46.07768],[6.58086,46.07845],[6.58437,46.07413],[6.58598,46.07053],
  [6.57979,46.06662],[6.58044,46.05938],[6.58011,46.05731],[6.57683,46.05805],[6.57246,46.05812],
  [6.56556,46.05596],[6.55859,46.05412],[6.54985,46.05252],[6.54279,46.05276],[6.53815,46.05368],
  [6.52988,46.05562],[6.52942,46.05289],[6.53395,46.0499],[6.53897,46.04844],[6.54431,46.04467],
  [6.54655,46.04147],[6.55051,46.03742],[6.55369,46.03435],[6.55773,46.02799],[6.5533,46.02264],
  [6.54428,46.01912],[6.53749,46.01235],[6.53549,46.01341],[6.5301,46.01095],[6.5312,46.0125],
  [6.52984,46.01269],[6.52427,46.01062],[6.51908,46.00726],[6.51432,46.00486],[6.50879,46.00156],
  [6.50869,46.00238],[6.50198,46.00282],[6.49321,46.00058],[6.48744,45.99767],[6.47971,45.9946],
  [6.47144,45.99077],[6.469,45.9895],[6.47083,45.98815],[6.46596,45.98033],[6.46861,45.97697],
  [6.46504,45.97615],[6.45528,45.97387],[6.44812,45.9694],[6.43807,45.96459],[6.4363,45.96088],
  [6.4377,45.95531],[6.43832,45.95474],[6.43896,45.95429],[6.43238,45.94676],[6.43379,45.94689],
  [6.42579,45.94364],[6.42546,45.94118],[6.41627,45.936],[6.41139,45.92608],[6.41134,45.92273],
  [6.41489,45.92084],[6.41978,45.91637],[6.41924,45.91181],[6.42098,45.90644],[6.42407,45.90505],
  [6.42505,45.90488]
]
