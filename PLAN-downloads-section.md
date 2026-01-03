# Downloads Section Plan - RAID Alpine

## Overview

Add download functionality in two places:
1. **Day Cards** - Download buttons integrated into each route info card
2. **Home Page** - Dedicated downloads section with all routes

---

## Available Files

| Day | GPX | FIT | TCX | Status |
|-----|-----|-----|-----|--------|
| Day 1 (Nice → Jausiers) | ✅ | ✅ | ✅ | Available |
| Day 2 (Jausiers → Briançon) | ✅ | ✅ | ✅ | Available |
| Day 3 | — | — | — | Coming Soon (placeholder) |
| Day 4 | ✅ | ✅ | ✅ | Available |
| Day 5 | ✅ | ✅ | ✅ | Available |
| Day 6 (→ Thonon) | ✅ | ✅ | ✅ | Available |

File path pattern: `/downloads/routes/{format}/RAID_Alpine_Day_{day}.{format}`

### Day 3 Placeholder
Day 3 route is not yet complete. Show a "Coming Soon" state with disabled download buttons.

---

## Part 1: Day Card Downloads

### Current DayCard Structure
```
┌─────────────────────────────────────┐
│ Day 1                               │
│ Nice → Jausiers                     │
│ 145km • 4,200m • 3 cols             │
│                                     │
│ Description text...                 │
│                                     │
│ [Col badges]                        │
│ • Highlights                        │
├─────────────────────────────────────┤
│ View stage details              →   │
└─────────────────────────────────────┘
```

### Proposed: Add Download Dropdown
```
┌─────────────────────────────────────┐
│ Day 1                               │
│ Nice → Jausiers                     │
│ 145km • 4,200m • 3 cols             │
│                                     │
│ Description text...                 │
│                                     │
│ [Col badges]                        │
│ • Highlights                        │
├─────────────────────────────────────┤
│ View stage details              →   │
│ ↓ Download route  [GPX ▾]           │  ← NEW
└─────────────────────────────────────┘
```

**Implementation:**
- Add a download row below "View stage details"
- Dropdown to select format (GPX/FIT/TCX)
- Icon: `heroicons:arrow-down-tray`
- Only show for riding days (not transit)

---

## Part 2: Home Page Downloads Section

### Location
Add new section after "Key Info" section (before footer)

### Design
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DOWNLOADS SECTION                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Eyebrow: ROUTE FILES                                                        │
│  Title: Download Your Routes                                                 │
│  Description: Get the RAID Alpine route files for your GPS device            │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  FORMAT INFO CARDS (3 columns)                                               │
│                                                                              │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │ 🗺️  GPX              │  │ 📊 FIT              │  │ 📄 TCX              │  │
│  │                     │  │                     │  │                     │  │
│  │ Universal format    │  │ Garmin native       │  │ Training Center     │  │
│  │ Works with most     │  │ format. Best for    │  │ XML format. Broad   │  │
│  │ apps & devices      │  │ Garmin/Wahoo        │  │ compatibility       │  │
│  │                     │  │                     │  │                     │  │
│  │ Strava, Komoot,     │  │ Garmin Edge,        │  │ Garmin, Strava,     │  │
│  │ RideWithGPS...      │  │ Wahoo ELEMNT...     │  │ TrainingPeaks...    │  │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘  │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  DOWNLOAD GRID (3 columns on desktop, 2 on tablet, 1 on mobile)             │
│                                                                              │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐             │
│  │ Day 1            │ │ Day 2            │ │ Day 3            │             │
│  │ Nice → Jausiers  │ │ Jausiers → ...   │ │ ... → ...        │             │
│  │ 145km • 4,200m   │ │ 128km • 3,800m   │ │                  │             │
│  │                  │ │                  │ │  ⏳ Coming Soon  │             │
│  │ [GPX] [FIT] [TCX]│ │ [GPX] [FIT] [TCX]│ │   (disabled)     │             │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘             │
│                                                                              │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐             │
│  │ Day 4            │ │ Day 5            │ │ Day 6            │             │
│  │ ...              │ │ ...              │ │ ... → Thonon     │             │
│  │                  │ │                  │ │ 132km • 2,900m   │             │
│  │                  │ │                  │ │                  │             │
│  │ [GPX] [FIT] [TCX]│ │ [GPX] [FIT] [TCX]│ │ [GPX] [FIT] [TCX]│             │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Structure

### New Components

#### 1. `components/downloads/FormatInfoCard.vue`
Explains each format and its compatibility.

```vue
<FormatInfoCard
  format="gpx"
  icon="mdi:map-marker-path"
  title="GPX"
  description="Universal GPS format"
  :compatibleWith="['Strava', 'Komoot', 'Garmin', 'Wahoo']"
/>
```

#### 2. `components/downloads/DownloadCard.vue`
Card for each day with all format download buttons.

```vue
<DownloadCard
  :day="day"
  :formats="['gpx', 'fit', 'tcx']"
/>
```

#### 3. `components/downloads/DownloadButton.vue`
Reusable download button (used in both DayCard and DownloadCard).

```vue
<DownloadButton
  :day="1"
  format="gpx"
  variant="compact" <!-- or "full" -->
/>
```

### Modified Components

#### `components/route/DayCard.vue`
Add download dropdown/buttons to existing card.

---

## Styling

### Color Scheme by Format

| Format | Color | Background | Border Hover |
|--------|-------|------------|--------------|
| GPX | Alpine (blue) | `bg-alpine-500/20` | `border-alpine-500` |
| FIT | Summit (orange) | `bg-summit-500/20` | `border-summit-500` |
| TCX | Glacier (teal) | `bg-glacier-500/20` | `border-glacier-500` |

### Download Buttons
```css
/* Compact style (for DayCard) */
.download-btn-compact {
  @apply px-3 py-1.5 rounded-lg text-xs font-medium
         transition-all hover:scale-105;
}

/* Full style (for Downloads section) */
.download-btn {
  @apply px-4 py-2 rounded-lg text-sm font-semibold
         flex items-center gap-2 transition-all;
}
```

---

## Data Structure

Add to `data/route.ts`:

```typescript
export interface DownloadFormat {
  id: 'gpx' | 'fit' | 'tcx'
  name: string
  icon: string
  description: string
  compatibleWith: string[]
  color: 'alpine' | 'summit' | 'glacier'
}

export const downloadFormats: DownloadFormat[] = [
  {
    id: 'gpx',
    name: 'GPX',
    icon: 'mdi:map-marker-path',
    description: 'Universal GPS format compatible with most apps and devices',
    compatibleWith: ['Strava', 'Komoot', 'Garmin Connect', 'Wahoo', 'RideWithGPS'],
    color: 'alpine'
  },
  {
    id: 'fit',
    name: 'FIT',
    icon: 'mdi:file-chart',
    description: 'Native Garmin format with rich activity data support',
    compatibleWith: ['Garmin Edge', 'Garmin Forerunner', 'Wahoo ELEMNT', 'Hammerhead'],
    color: 'summit'
  },
  {
    id: 'tcx',
    name: 'TCX',
    icon: 'mdi:file-code',
    description: 'Training Center XML format with broad compatibility',
    compatibleWith: ['Garmin devices', 'Strava', 'TrainingPeaks', 'Zwift'],
    color: 'glacier'
  }
]

export function getDownloadUrl(day: number, format: 'gpx' | 'fit' | 'tcx'): string {
  return `/downloads/routes/${format}/RAID_Alpine_Day_${day}.${format}`
}

export function hasDownload(day: number): boolean {
  // Day 3 not yet available - returns false for placeholder state
  return [1, 2, 4, 5, 6].includes(day)
}

export function isComingSoon(day: number): boolean {
  // Day 3 route is not yet complete
  return day === 3
}
```

---

## Implementation Steps

### Phase 1: Foundation
- [ ] Add download format types and helper functions to `data/route.ts`
- [ ] Create `DownloadButton.vue` component

### Phase 2: Day Card Integration
- [ ] Modify `DayCard.vue` to include download buttons
- [ ] Add format dropdown or button group
- [ ] Test on route page and home page

### Phase 3: Home Page Section
- [ ] Create `FormatInfoCard.vue` component
- [ ] Create `DownloadCard.vue` component
- [ ] Add Downloads section to `pages/index.vue`
- [ ] Style and animate

### Phase 4: Polish
- [ ] Test all download links work
- [ ] Verify mobile responsiveness
- [ ] Add hover effects and transitions
- [ ] Test across browsers

---

## Mobile Considerations

### DayCard Downloads
- Compact button row: `[GPX] [FIT] [TCX]`
- Or dropdown menu to save space

### Home Page Section
- Format info cards: Stack vertically
- Download cards: Single column
- Buttons: Full width, stacked

---

## Accessibility

- Download buttons have aria-labels: "Download Day 1 route in GPX format"
- Format descriptions visible (not just colors)
- Keyboard navigable
- Focus states on all interactive elements
