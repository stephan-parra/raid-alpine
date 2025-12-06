export interface Col {
  name: string
  elevation: number
  length?: number
  avgGrade?: number
  maxGrade?: number
  description?: string
  tourAppearances?: number
  firstCrossed?: number
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
  startDate: '18/07/2026',
  endDate: '25/07/2026',
}

export const days: DayStage[] = [
  {
    day: 0,
    date: '18/07/2026',
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
    date: '19/07/2026',
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
    date: '20/07/2026',
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
    date: '21/07/2026',
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
    rideWithGPSEmbed: 'https://ridewithgps.com/embeds?type=route&id=52996478&metricUnits=true&sampleGraph=true&distanceMarkers=true&privacyCode=3GdVOGi89e7bNmVAZxMma7gRAEvEoX8P',
    coordinates: {
      start: [6.8807, 45.5842],
      end: [6.4283, 45.1647],
    },
  },
  {
    day: 4,
    date: '22/07/2026',
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
    date: '23/07/2026',
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
    date: '24/07/2026',
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
    date: '25/07/2026',
    start: 'Nice',
    finish: 'UK',
    distance: 0,
    elevation: 0,
    description: 'Return journey from Nice. Disassemble bikes, celebrate the achievement, and travel home with incredible memories.',
    cols: [],
    highlights: ['Celebration in Nice', 'Return travel', 'Mission accomplished'],
    isTransitDay: true,
  },
]

// Get only riding days (non-transit)
export const ridingDays = days.filter(day => !day.isTransitDay)

// Extract all unique cols for the cols page
export const allCols: Col[] = ridingDays.flatMap(day => day.cols).filter(col => col.elevation > 0)

// Featured cols (the legendary ones)
export const featuredCols = [
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
  },
  {
    name: "Col d'Izoard",
    elevation: 2361,
    length: 19.2,
    avgGrade: 5.9,
    maxGrade: 9.0,
    description: 'Famous for the otherworldly Casse Déserte moonscape near the summit. Monuments honor cycling legends Coppi and Bobet.',
    tourAppearances: 35,
    firstCrossed: 1922,
    day: 4,
    image: '/images/cols/izoard.jpg',
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
  },
]

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
