# RAID Alpine - Feature Ideas

A collection of mind-blowing feature ideas that could elevate the RAID Alpine website to the next level.

---

## Table of Contents

1. [3D Flythrough Route Experience](#1-3d-flythrough-route-experience)
2. [Interactive Scrollytelling Journey](#2-interactive-scrollytelling-journey)
3. [Personal Training Plan Generator](#3-personal-training-plan-generator)
4. [Strava Integration & Fitness Predictor](#4-strava-integration--fitness-predictor)
5. [Real-Time Col Status Dashboard](#5-real-time-col-status-dashboard)
6. [Augmented Reality Col Cards](#6-augmented-reality-col-cards)
7. [Nutrition & Calorie Planner](#7-nutrition--calorie-planner)
8. [What to Expect Video Previews](#8-what-to-expect-video-previews)
9. [Dynamic Packing Checklist](#9-dynamic-packing-checklist)
10. [Emergency & Support Map](#10-emergency--support-map)

---

## 1. 3D Flythrough Route Experience

### Overview

Create an immersive 3D terrain visualization where users can "fly" through the entire 770km route. Using Three.js with real elevation data, this feature would render the French Alps in stunning 3D with the route ribbon laid over the mountains.

### Key Features

- **Cinematic Flythrough Mode**: Automated camera path that soars through all 6 days of the route
- **Interactive Exploration**: Users can control the camera to explore specific cols and valleys
- **Multiple View Modes**: Toggle between satellite texture, stylized terrain, and wireframe
- **Route Visualization**: Glowing route line draped over 3D terrain with distance markers
- **Col Highlights**: Pop-up information cards when approaching major climbs
- **Day/Night Cycle**: Optional lighting that simulates different times of day

### Technical Approach

- Three.js for 3D rendering
- Mapbox or OpenTopography for elevation data (DEM tiles)
- Custom shaders for terrain materials
- Orbit controls for user interaction
- GSAP for camera path animations

### Impact

This would be genuinely jaw-dropping - imagine soaring over Col de l'Iseran at 2,770m, seeing the hairpins snake up the mountainside, then diving down into the valley below. Nothing else like it exists for cycling routes.

---

## 2. Interactive Scrollytelling Journey

### Overview

A full-page immersive scroll experience where scrolling simulates riding the entire route. Inspired by award-winning interactive journalism pieces like NYT's "Snow Fall", this would create an emotional narrative journey through the Alps.

### Key Features

- **Parallax Mountain Layers**: Multiple depth layers create a sense of riding into the mountains
- **Dynamic Background Transitions**: Photography shifts from Lake Geneva's shores to alpine meadows to rocky summits
- **Progressive Elevation Profile**: The elevation chart fills as you scroll, showing your "progress"
- **Contextual Information**: Stats, stories, and col info animate in at precisely the right moments
- **Audio Ambiance**: Optional soundscape with wind, cowbells, gravel under tires, cheering at summits
- **Chapter Navigation**: Quick-jump to specific days or cols
- **Speed Control**: Scroll sensitivity adjustment for different reading preferences

### Content Sections

1. **The Beginning**: Lake Geneva, anticipation, the journey ahead
2. **Day by Day**: Each stage with key moments, challenges, and rewards
3. **The Cols**: Deep dives into legendary climbs with history and drama
4. **The Finish**: Arrival in Nice, the Mediterranean, achievement

### Technical Approach

- GSAP ScrollTrigger for scroll-based animations
- Intersection Observer for performance
- Lottie for complex micro-animations
- Howler.js for audio management
- CSS scroll-snap for chapter boundaries

### Impact

Creates a deep emotional connection to the adventure before riders even leave home. Transforms route information into storytelling.

---

## 3. Personal Training Plan Generator

### Overview

An intelligent tool that generates a customized training plan based on the user's current fitness level, available training time, and weeks remaining until RAID Alpine.

### Key Features

- **Fitness Assessment**: Initial questionnaire about current abilities, recent rides, FTP if known
- **Time Until Event**: Integrates with the countdown timer to calculate available training weeks
- **Weekly Structure**: Generates periodized plan with base, build, peak, and taper phases
- **Key Workouts**: Specific sessions designed to prepare for alpine climbing
  - Long steady climbs
  - Repeated threshold efforts
  - Back-to-back long days
  - Heat acclimatization protocols
- **Volume Recommendations**: Weekly hours/km targets with progressive overload
- **Rest & Recovery**: Built-in recovery weeks and adaptation periods
- **Calendar Export**: Download as .ics for Google Calendar, Apple Calendar, etc.
- **Progress Tracking**: Check off completed workouts, see readiness score evolve

### Sample Output

```
RAID Alpine Training Plan - 16 Weeks Out
=========================================

Week 1-4: Base Building
- Focus: Aerobic endurance, pedaling efficiency
- Weekly volume: 8-10 hours
- Key session: 3-hour Z2 ride with 1x20min tempo

Week 5-8: Build Phase 1
- Focus: Climbing strength, threshold power
- Weekly volume: 10-12 hours
- Key session: Hill repeats 6x8min at threshold

...
```

### Technical Approach

- Vue composable for plan generation logic
- Form wizard for data collection
- LocalStorage for saving progress
- PDF generation for printable plans

### Impact

Transforms the website from information resource to active training partner. Increases rider confidence and preparation.

---

## 4. Strava Integration & Fitness Predictor

### Overview

Connect your Strava account to get personalized insights comparing your riding history against the RAID Alpine route, with predicted completion times and a "readiness score".

### Key Features

- **OAuth Integration**: Secure Strava connection
- **Climb Comparison**: Your best climbs vs RAID Alpine cols
  - "Your Alpe d'Huez time suggests you'll climb Galibier in approximately 2h15m"
- **Volume Analysis**: Your recent training load vs recommended preparation
- **Power Profile Matching**: If power data available, predict times with high accuracy
- **Readiness Score**: 0-100 score based on:
  - Recent climbing volume
  - Longest ride comparison
  - Back-to-back day experience
  - Elevation gain totals
- **Progress Tracking**: Re-check as training progresses to see improvement
- **Social Proof**: "You've already climbed X% of the total elevation in training"

### Predicted Times Display

```
Based on your Strava data:
==========================
Day 1: 5h 45m - 6h 30m
Day 2: 6h 00m - 7h 00m
Day 3: 4h 30m - 5h 15m
...
Total: 35h - 42h riding time

Your Readiness Score: 72/100
"Strong climber, consider more back-to-back training days"
```

### Technical Approach

- Strava API v3 integration
- Serverless functions for OAuth flow (Netlify/Vercel)
- Algorithm based on climbing VAM and power curves
- Privacy-first: data processed client-side where possible

### Impact

Makes the route deeply personal. Answers the question every cyclist asks: "Can I actually do this?"

---

## 5. Real-Time Col Status Dashboard

### Overview

A live dashboard showing current conditions at each major col on the route, helping riders and planners make informed decisions.

### Key Features

- **Current Weather**: Temperature, wind, precipitation at each summit
- **Road Status**: Open/Closed/Restricted from official French road APIs
- **Snow Line**: Current elevation where snow begins
- **Webcam Feeds**: Live or recent images from key summits
  - Col de l'Iseran
  - Col du Galibier
  - Cime de la Bonette
- **Historical Data**: "Best time of day to climb" based on typical conditions
- **Forecast Integration**: 7-day outlook for planning
- **Alert System**: Notifications for road closures or severe weather

### Data Sources

- Météo France API for weather
- InfoRoute Hautes-Alpes for road status
- Windy.com embeds for wind visualization
- Various webcam feeds (Savoie, Hautes-Alpes tourism)

### Display Modes

1. **Map View**: Icons overlaid on route map
2. **List View**: Sortable table of all cols
3. **Timeline View**: Conditions throughout the day

### Technical Approach

- Serverless functions to proxy/cache API calls
- Refresh every 15-30 minutes
- Fallback static data when APIs unavailable
- Service worker for offline access to last-known status

### Impact

Essential practical tool that could genuinely affect safety. Shows the website cares about riders' wellbeing.

---

## 6. Augmented Reality Col Cards

### Overview

QR codes on the website that, when scanned at the actual col summits during the ride, unlock augmented reality experiences and achievement tracking.

### Key Features

- **QR Code Generation**: Unique codes for each of the 20+ cols
- **AR Overlay**: When scanned on location:
  - Historical Tour de France footage appears
  - Famous cyclists' quotes overlay the landscape
  - Your position shown on the elevation profile
  - "You are here" with remaining distance/elevation
- **Achievement Badges**: Digital badges for each conquered col
  - Bronze: Reached the summit
  - Silver: Photo verification
  - Gold: Time-based achievements
- **Photo Frame**: Take photos with official RAID Alpine branded overlay
- **Collection Progress**: Track which cols you've "collected"
- **Social Sharing**: Share achievements directly to social media

### Technical Approach

- AR.js or 8th Wall for web-based AR
- Geolocation verification (must be at col to unlock)
- Progressive Web App for offline functionality
- IndexedDB for storing achievements locally

### Impact

Gamifies the experience and creates lasting digital memories. Bridges the website to the real-world adventure.

---

## 7. Nutrition & Calorie Planner

### Overview

An interactive calculator that helps riders plan their nutrition strategy for each stage, ensuring they fuel properly for 6 consecutive days of alpine riding.

### Key Features

- **Calorie Calculator**: Estimates burn per stage based on:
  - Distance and elevation
  - Rider weight input
  - Estimated intensity/duration
- **Daily Requirements**: Shows total daily needs including base metabolism
- **Hydration Planning**: Water/electrolyte requirements by stage
- **Nutrition Timing**: When to eat what during each stage
  - Pre-ride breakfast recommendations
  - On-bike fueling schedule (every 20-30 min)
  - Recovery nutrition windows
- **Food Suggestions**: Specific product/food recommendations
  - Energy gels/bars
  - Real food options
  - French bakery stops (pain au chocolat strategy!)
- **Multi-Day Considerations**: Glycogen replenishment, protein for recovery
- **Printable Pocket Guides**: Small cards for jersey pockets with stage-specific plans

### Sample Output

```
Day 4: Briançon to Jausiers
===========================
Distance: 112km | Elevation: 3,200m
Estimated Time: 6-7 hours
Estimated Burn: 4,800-5,500 kcal

Nutrition Plan:
- Breakfast (2h before): 800-1000 kcal
- On-bike: 60-90g carbs/hour = 360-540g total
- Suggested: 8-12 gels/bars + real food at cafes
- Hydration: 500-750ml/hour = 3-4.5L total
- Electrolytes: 1 tab per 500ml in heat

Key Refuel Points:
- Col d'Izoard summit (km 52)
- Guillestre town (km 75)
```

### Technical Approach

- Vue reactive calculator
- LocalStorage for user preferences
- PDF generation for printable guides
- Unit conversion (metric/imperial)

### Impact

Addresses a critical concern for multi-day events. Prevents bonking and DNFs through proper planning.

---

## 8. What to Expect Video Previews

### Overview

Short, high-quality drone and GoPro video clips for each major section of the route, giving riders a visceral preview of what they'll experience.

### Key Features

- **Final Kilometer Videos**: The last km of each major col
  - Gradient visualization overlay
  - Distance countdown
  - What the summit looks like
- **Hairpin Highlights**: Famous switchback sections
  - Lacets de Montvernier
  - Col de la Bonette hairpins
- **Descent Previews**: Key descents to know
  - Technical sections to watch for
  - Road surface quality
  - Suggested speeds
- **Scenic Moments**: Beautiful sections to look forward to
  - Cormet de Roselend reservoir
  - Casse Déserte moonscape
  - Mediterranean first sighting
- **Interactive Integration**: Videos embedded at relevant points on elevation profile
- **Timestamp Markers**: Click points on the route to see video from that location

### Video Specifications

- 30-60 second clips
- 1080p optimized for web
- Subtitles with location/stats
- Optional music or ambient audio

### Technical Approach

- YouTube/Vimeo embeds for hosting
- Lazy loading for performance
- Video.js for custom player styling
- Intersection Observer for autoplay on scroll

### Impact

Transforms abstract route data into tangible anticipation. Reduces anxiety about unknown roads.

---

## 9. Dynamic Packing Checklist

### Overview

An interactive, saveable packing list that helps riders prepare everything they need for 6 days of alpine adventure.

### Key Features

- **Interactive Checkboxes**: Mark items as packed
- **Progress Indicator**: "23/45 items packed"
- **Category Organization**:
  - Bike & Tools
  - Cycling Clothing
  - Electronics & Navigation
  - Off-Bike Clothing
  - Toiletries & Medical
  - Documents & Admin
- **Weight Calculator**: Shows total pack weight as items are added
- **Essential vs. Comfort Mode**: Toggle to see must-haves vs nice-to-haves
- **Weather-Based Suggestions**: Recommendations based on forecast
- **Custom Items**: Add your own items to the list
- **Sync Across Devices**: LocalStorage with optional account sync
- **Share List**: Generate shareable link for riding partners
- **Print to PDF**: Clean, printable checklist format

### Sample Categories

```
CYCLING CLOTHING
================
[ ] Jerseys x6 (one per day)
[ ] Bib shorts x3 (rotate)
[ ] Base layers x2
[ ] Arm warmers
[ ] Leg warmers
[ ] Gilet
[ ] Rain jacket
[ ] Warm jacket for descents
[ ] Gloves (short finger)
[ ] Gloves (long finger)
[ ] Helmet
[ ] Sunglasses
[ ] Cycling shoes
[ ] Shoe covers (rain)

Weight: 2.4kg
```

### Technical Approach

- Vue reactive state management
- LocalStorage persistence
- Checkbox animations (satisfying!)
- PDF generation with jsPDF
- URL state encoding for sharing

### Impact

Reduces pre-trip stress. Ensures nothing critical is forgotten.

---

## 10. Emergency & Support Map

### Overview

An interactive map layer showing critical safety and support information along the entire route.

### Key Features

- **Medical Facilities**:
  - Hospitals with A&E
  - Pharmacies
  - Medical centers
  - Veterinary (for that one person who brings their dog)
- **Bike Support**:
  - Bike shops with locations and hours
  - Known mechanics in remote areas
  - Decathlon/major retailers
- **Sustenance**:
  - Water refill points (fountains, cafes)
  - Recommended cafes and restaurants
  - Supermarkets for supplies
- **Communication**:
  - Mobile phone coverage zones (dead spots marked)
  - WiFi hotspots
- **Emergency Services**:
  - Emergency numbers (15, 18, 112)
  - Mountain rescue contact
  - Helicopter landing zones
- **Accommodation**:
  - Hotels at stage ends
  - Emergency shelter options

### Display Features

- Toggle layers on/off
- Filter by category
- Distance from route calculation
- Opening hours display
- Phone numbers (click to call on mobile)
- Offline access for remote areas

### Data Management

- Community-contributed updates
- Annual verification process
- User ratings and comments

### Technical Approach

- MapLibre GL layers
- GeoJSON data format
- Service worker for offline
- Click-to-call integration

### Impact

Could literally save lives. Shows deep care for rider safety and wellbeing.

---

## Priority Recommendations

Based on impact and feasibility:

| Priority | Feature | Impact | Effort |
|----------|---------|--------|--------|
| 1 | 3D Flythrough | Extremely High | High |
| 2 | Scrollytelling Journey | Very High | Medium-High |
| 3 | Strava Integration | High | Medium |
| 4 | Dynamic Packing Checklist | Medium-High | Low |
| 5 | Emergency & Support Map | High | Medium |
| 6 | Nutrition Planner | Medium | Low-Medium |
| 7 | Training Plan Generator | Medium-High | Medium |
| 8 | Real-Time Col Status | Medium | Medium |
| 9 | Video Previews | Medium | Low (content-dependent) |
| 10 | AR Col Cards | High | High |

---

## Next Steps

1. Review and prioritize features based on team capacity and timeline
2. Create detailed technical specifications for top priorities
3. Design UI/UX mockups
4. Implement in phases, starting with highest-impact features
5. Gather user feedback and iterate

---

*Document created: January 2026*
*RAID Alpine - July 11-18, 2026*
