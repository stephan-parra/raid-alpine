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
  start: string
  finish: string
  distance: number
  elevation: number
  description: string
  cols: Col[]
  highlights: string[]
  profileImage?: string
  coordinates: {
    start: [number, number]
    end: [number, number]
  }
}

export interface RouteStats {
  totalDistance: number
  totalElevation: number
  totalDays: number
  highestPoint: number
  lowestPoint: number
}

export const routeStats: RouteStats = {
  totalDistance: 770,
  totalElevation: 18000,
  totalDays: 6,
  highestPoint: 2802,
  lowestPoint: 0,
}

export const days: DayStage[] = [
  {
    day: 1,
    start: 'Thonon-les-Bains',
    finish: 'La Clusaz',
    distance: 110,
    elevation: 2550,
    description: 'Warm up from Lake Geneva through pine forests. A challenging opening day with five cols to conquer.',
    cols: [
      { name: 'Col des Moises', elevation: 1118 },
      { name: 'Col de Terramont', elevation: 1080 },
      { name: 'Col de Jambaz', elevation: 1027 },
      { name: 'Col de la Ramaz', elevation: 1557 },
      { name: 'Col de la Colombiere', elevation: 1613 },
    ],
    highlights: ['Lake Geneva views', 'Pine forest climbs', 'Alpine villages'],
    profileImage: 'https://preview.marmot-tours.co.uk/storage/media/images/general/rfi-d1-25-ramaz-colombiere-raid-alpine-67ed62c2d60dd.gif',
    coordinates: {
      start: [6.4793, 46.3706],
      end: [6.4249, 45.9046],
    },
  },
  {
    day: 2,
    start: 'La Clusaz',
    finish: 'Sainte-Foy-Tarentaise',
    distance: 109,
    elevation: 3150,
    description: 'Through famous Alpine areas with a spectacular 26km descent to Bourg-Saint-Maurice. Welcome to Beaufort cheese country.',
    cols: [
      { name: 'Col des Aravis', elevation: 1487 },
      { name: 'Col de Saisies', elevation: 1633 },
      { name: 'Col du Pré', elevation: 1740 },
      {
        name: 'Cormet de Roselend',
        elevation: 1968,
        length: 19.9,
        avgGrade: 6.1,
        description: 'One of the most scenic climbs in the Alps with its stunning reservoir views.',
      },
    ],
    highlights: ['Beaufort cheese country', 'Roselend Dam views', '26km descent'],
    profileImage: 'https://preview.marmot-tours.co.uk/storage/media/images/general/rfi-d2-25-aravis-saisies-col-du-pre-cormet-roselend-raid-alpine-67ed62c2d3d91.gif',
    coordinates: {
      start: [6.4249, 45.9046],
      end: [6.8807, 45.5842],
    },
  },
  {
    day: 3,
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
      { name: "Côte d'Aussois", elevation: 1519 },
      { name: 'Col du Télégraphe', elevation: 1566 },
    ],
    highlights: ['Highest paved pass in Alps', '36km epic climb', 'Maurienne Valley'],
    profileImage: 'https://preview.marmot-tours.co.uk/storage/media/images/general/rfi-d3-25-iseran-aussois-telegraphe-raid-alpine-67ed62c2dda19.gif',
    coordinates: {
      start: [6.8807, 45.5842],
      end: [6.4283, 45.1647],
    },
  },
  {
    day: 4,
    start: 'Valloire',
    finish: 'Vars',
    distance: 121,
    elevation: 3200,
    description: 'Legendary Tour de France climbs. The Galibier with its brutal 10% final kilometer, followed by the historic Izoard.',
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
      { name: 'Col de Vars', elevation: 2109 },
    ],
    highlights: ['Tour de France legends', 'Coppi & Bobet monuments', 'Casse Déserte'],
    profileImage: 'https://preview.marmot-tours.co.uk/storage/media/images/general/rfi-d4-25-galibier-lautaret-izoard-raid-alpine-67ed62c3befee.gif',
    coordinates: {
      start: [6.4283, 45.1647],
      end: [6.6892, 44.5603],
    },
  },
  {
    day: 5,
    start: 'Vars',
    finish: 'Valberg',
    distance: 134,
    elevation: 3400,
    description: 'The highest paved road in Europe! Cime de la Bonette at 2,802m followed by an incredible 53km descent.',
    cols: [
      { name: 'Col de Vars summit', elevation: 2105 },
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
      { name: 'Col de la Couillole', elevation: 1678 },
    ],
    highlights: ['Highest paved road in Europe', '53km descent', 'Alpine to Mediterranean transition'],
    profileImage: 'https://preview.marmot-tours.co.uk/storage/media/images/general/rfi-d5-25-vars-bonette-couillole-raid-alpine-67ed62c3ddba5.gif',
    coordinates: {
      start: [6.6892, 44.5603],
      end: [6.9317, 44.0858],
    },
  },
  {
    day: 6,
    start: 'Valberg',
    finish: 'Nice',
    distance: 160,
    elevation: 2000,
    description: 'The finale! Scenery transforms from alpine to Mediterranean as you descend to the Côte d\'Azur.',
    cols: [
      { name: 'Col de Saint-Raphaël', elevation: 876 },
      { name: 'Col de Bleine', elevation: 1439 },
      { name: 'Col du Pilon', elevation: 786 },
    ],
    highlights: ['Mediterranean arrival', 'Gorges du Cians', 'Nice seafront finish'],
    profileImage: 'https://preview.marmot-tours.co.uk/storage/media/images/general/rfi-d6-25-saint-raphael-bleine-pilon-nice-raid-alpine-67ed62c3c79a0.gif',
    coordinates: {
      start: [6.9317, 44.0858],
      end: [7.2620, 43.7102],
    },
  },
]

// Extract all unique cols for the cols page
export const allCols: Col[] = days.flatMap(day => day.cols)

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
    description: 'One of the most iconic climbs in cycling history. The brutal final kilometer at 10% grade has broken countless riders.',
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
    description: 'One of the most scenic climbs in the Alps, featuring the stunning turquoise Roselend reservoir and dramatic mountain backdrop.',
    tourAppearances: 7,
    day: 2,
    image: '/images/cols/roselend.jpg',
  },
  {
    name: 'Col de la Colombiere',
    elevation: 1613,
    length: 11.7,
    avgGrade: 6.8,
    description: 'A beautiful introduction to Alpine climbing. Regular Tour de France fixture with consistent gradients through alpine meadows.',
    tourAppearances: 20,
    day: 1,
    image: '/images/cols/colombiere.jpg',
  },
]

// Route coordinates for map
export const routeCoordinates: [number, number][] = [
  [6.4793, 46.3706], // Thonon-les-Bains
  [6.4249, 45.9046], // La Clusaz
  [6.8807, 45.5842], // Sainte-Foy-Tarentaise
  [6.4283, 45.1647], // Valloire
  [6.6892, 44.5603], // Vars
  [6.9317, 44.0858], // Valberg
  [7.2620, 43.7102], // Nice
]
