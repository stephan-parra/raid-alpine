# Downloads Section Plan - RAID Alpine

## Overview

Add a downloads section where users can download the RAID Alpine route files in their preferred GPS format (GPX, FIT, TCX).

---

## Design Concept

### Visual Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DOWNLOADS SECTION                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Eyebrow: ROUTE FILES                                                       │
│  Title: Download Your Route                                                  │
│  Description: Get the complete RAID Alpine route files in your              │
│               preferred GPS format                                           │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─── FORMAT SELECTOR TABS ───────────────────────────────────────────┐     │
│  │   [ GPX ]    [ FIT ]    [ TCX ]    [ All Formats ]                 │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │ 📥 COMPLETE ROUTE   │  │                     │  │                     │  │
│  │                     │  │                     │  │                     │  │
│  │ All 6 days in one   │  │  Format Info Card   │  │  Device Compat.     │  │
│  │ download            │  │  (description of    │  │  Card               │  │
│  │                     │  │   selected format)  │  │                     │  │
│  │ [Download .gpx]     │  │                     │  │                     │  │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘  │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  INDIVIDUAL DAY DOWNLOADS                                                    │
│                                                                              │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐             │
│  │ Day 1            │ │ Day 2            │ │ Day 3            │             │
│  │ Nice → Jausiers  │ │ Jausiers → ...   │ │ ...              │             │
│  │ 145km • 4,200m ↑ │ │ 128km • 3,800m ↑ │ │                  │             │
│  │ [Download]       │ │ [Download]       │ │ [Download]       │             │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘             │
│                                                                              │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐             │
│  │ Day 4            │ │ Day 5            │ │ Day 6            │             │
│  │ ...              │ │ ...              │ │ ... → Thonon     │             │
│  │                  │ │                  │ │ 132km • 2,900m ↑ │             │
│  │ [Download]       │ │ [Download]       │ │ [Download]       │             │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Details

### Option A: Section on Home Page (Recommended)

Add as a new section on `pages/index.vue` after the "Key Info" section and before the footer.

**Pros:**
- Everything in one place
- No additional navigation needed
- Follows existing page pattern

**Cons:**
- Makes home page longer

### Option B: Dedicated Downloads Page

Create new page at `pages/downloads.vue` with navigation link.

**Pros:**
- Clean separation of concerns
- Room for expansion (guides, PDFs, etc.)

**Cons:**
- Additional navigation step

### Option C: Add to Route Page

Add downloads section to `pages/route/index.vue`

**Pros:**
- Contextually relevant (route page = route downloads)
- Already has day information nearby

---

## Components to Create

### 1. `components/downloads/DownloadSection.vue`
Main section wrapper with format tabs and layout

### 2. `components/downloads/FormatCard.vue`
Card explaining each format with icon and compatibility info

```vue
<FormatCard
  format="gpx"
  icon="mdi:map-marker-path"
  title="GPX Format"
  description="Universal GPS format compatible with most apps"
  :compatibleWith="['Strava', 'Komoot', 'Garmin', 'Wahoo', 'RideWithGPS']"
  variant="alpine"
/>
```

### 3. `components/downloads/DayDownloadCard.vue`
Individual day download card

```vue
<DayDownloadCard
  :day="1"
  start="Nice"
  finish="Jausiers"
  :distance="145"
  :elevation="4200"
  :formats="['gpx', 'fit', 'tcx']"
  :selectedFormat="currentFormat"
/>
```

### 4. `components/downloads/BulkDownloadCard.vue`
Card for downloading all days at once (if we create combined files)

---

## Styling Guidelines

### Color Coding by Format

| Format | Color Variant | Hex Color | Icon |
|--------|--------------|-----------|------|
| GPX | Alpine (blue) | #0ea5e9 | `mdi:map-marker-path` |
| FIT | Summit (orange) | #ee7712 | `mdi:file-chart` |
| TCX | Glacier (teal) | #498181 | `mdi:xml` |

### Card Styling
- Use `.glass-dark` background
- Hover: `.shadow-glow` effect
- Border: `border-white/10` default, color on hover
- Icons: 48x48 with gradient background circle

### Buttons
- Primary download: `.btn-primary` (summit gradient)
- Secondary/format toggle: `.btn-secondary` (glass style)

---

## Data Structure Addition

Add to `data/route.ts`:

```typescript
export interface DownloadFormat {
  id: 'gpx' | 'fit' | 'tcx'
  name: string
  extension: string
  icon: string
  description: string
  compatibleWith: string[]
  color: 'alpine' | 'summit' | 'glacier'
}

export const downloadFormats: DownloadFormat[] = [
  {
    id: 'gpx',
    name: 'GPX',
    extension: '.gpx',
    icon: 'mdi:map-marker-path',
    description: 'GPS Exchange Format - Universal format supported by most GPS apps and devices',
    compatibleWith: ['Strava', 'Komoot', 'Garmin Connect', 'Wahoo', 'RideWithGPS', 'Google Maps'],
    color: 'alpine'
  },
  {
    id: 'fit',
    name: 'FIT',
    extension: '.fit',
    icon: 'mdi:file-chart',
    description: 'Flexible and Interoperable Data Transfer - Native Garmin format with rich data support',
    compatibleWith: ['Garmin Edge', 'Garmin Forerunner', 'Wahoo ELEMNT', 'Hammerhead Karoo'],
    color: 'summit'
  },
  {
    id: 'tcx',
    name: 'TCX',
    extension: '.tcx',
    icon: 'mdi:xml',
    description: 'Training Center XML - Legacy format with broad compatibility',
    compatibleWith: ['Garmin devices', 'Strava', 'TrainingPeaks', 'Zwift'],
    color: 'glacier'
  }
]

// File paths helper
export function getDownloadPath(day: number, format: 'gpx' | 'fit' | 'tcx'): string {
  return `/downloads/routes/${format}/RAID_Alpine_Day_${day}.${format}`
}
```

---

## File Structure

Current structure (confirmed from screenshot):
```
/downloads/routes/
├── fit/
│   └── RAID_Alpine_Day_1.fit ... Day_6.fit
├── gpx/
│   └── RAID_Alpine_Day_1.gpx ... Day_6.gpx
└── tcx/
    └── RAID_Alpine_Day_1.tcx ... Day_6.tcx
```

---

## User Flow

1. User scrolls to Downloads section (or navigates to /downloads)
2. Sees format explanation cards - understands which format to choose
3. Selects preferred format via tabs (GPX default)
4. Can download complete route OR individual days
5. Download button triggers browser download

---

## Animation & Interactions

- Section entrance: Fade up on scroll (existing pattern)
- Format tabs: Smooth background slide on selection
- Cards: Staggered entrance animation
- Download button: Hover glow effect
- Success feedback: Brief checkmark animation after download starts

---

## Accessibility

- All buttons have descriptive aria-labels
- Format tabs use proper tab role/keyboard navigation
- Download links have clear file format in text
- Color is not the only indicator (icons + text)

---

## Mobile Responsive

- Format tabs: Horizontal scroll or 2x2 grid
- Day cards: Single column stack
- Download buttons: Full width on mobile
- Touch targets: Minimum 44x44px

---

## Implementation Steps

1. [ ] Add download format types to `data/route.ts`
2. [ ] Create `FormatCard.vue` component
3. [ ] Create `DayDownloadCard.vue` component
4. [ ] Create `DownloadSection.vue` main component
5. [ ] Add section to home page OR create downloads page
6. [ ] Add navigation link (if separate page)
7. [ ] Test downloads work correctly
8. [ ] Verify mobile responsiveness
9. [ ] Add analytics tracking (optional)

---

## Future Enhancements

- Combined "All Days" download as single file
- Cue sheet PDFs
- Elevation profiles as images
- Print-friendly route cards
- Email route to device option
