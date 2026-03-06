# Valkri Dashboard — Open-Source Geospatial Intelligence Dashboard

A real-time intelligence dashboard built around an interactive 3D globe, designed to aggregate, visualize, and analyze open-source data streams across geopolitical events, infrastructure, and threat landscapes.

## Vision

> **Note:** This project is in active early development. Features, tech stack choices, and architecture are all subject to change as the project evolves.

Valkri brings together disparate OSINT data sources into a single operational picture. The core interface is an [OpenGlobus](https://www.openglobus.org/)-powered 3D globe where users can explore live events spatially — from active conflict zones and shipping lanes to infrastructure outages and natural disasters — backed by a live news feed and structured reporting tools.

The initial focus is on the Russo-Ukrainian conflict as a proving ground, given the volume and variety of available data. The platform is designed to scale across any region or event type.

## Core Features

### 3D Globe (OpenGlobus)

The primary interface is an interactive globe with layered data overlays. A 2D map toggle is planned for accessibility and performance on lower-end devices.

**Data layers include:**

- **Shipping lanes** — AIS vessel tracking and maritime route visualization
- **Air travel routes** — Flight path data and airspace activity
- **Railway networks** — Rail infrastructure and service maps
- **Infrastructure announcements** — Physical markers for deployments, construction, outages
- **Down Detector integration** — Service outage heatmaps and status
- **Geotagged video** — YouTube and other platforms, plotted by location
- **Radiation mapping** — Environmental monitoring station data
- **Natural disasters** — Earthquakes, weather events, geological disturbances
- **Blockchain transactions** — Geospatially-tagged on-chain activity
- **ALPR reporting** — License plate reader data (via Deflock.me and similar sources)
- **Conflict tracking** — Active wars, territorial control, frontline changes
- **Threat actor monitoring** — Inspired by platforms like Cognyte's external threat intelligence

### Live News Feed

A multi-source aggregated feed pulling from:

- **Twitter/X** — Filtered for OSINT-relevant accounts and keywords
- **Telegram** — Channel monitoring for conflict and regional intel
- **Traditional news** — RSS and API-based ingestion from major outlets

### Reporting Engine

Structured report creation with an emphasis on integrity:

- Templated and freeform intelligence reports
- Immutable report storage (blockchain-anchored hashing under consideration)
- Link analysis visualization inspired by [Maltego's approach](https://www.maltego.com/blog/infographic-what-is-link-analysis/)

## Tech Stack

### Frontend

- **Framework:** Next.js (TypeScript/React)
- **Globe:** [OpenGlobus](https://www.openglobus.org/)
- **State management:** Redux (TypeScript)
- **Graph visualization:** Cytoscape.js
- **Mapping fallback:** Mapbox GL JS

### Backend

- **API layer:** Rust (high-performance HTTP/gRPC)
- **Ingest services:** Python — scrapers, API connectors, RSS consumers
- **Processing services:** Python — NLP, entity extraction, deduplication, geocoding

### Data Layer

- **Graph database:** Neo4j or TigerGraph (entity relationships, link analysis)
- **Vector search:** Qdrant or pgvector (semantic search across reports and feeds)
- **Message queue:** Kafka or RabbitMQ (service-to-service communication)

### Architecture

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │◄───►│   Rust API   │◄───►│   Neo4j /    │
│  Next.js +   │     │   Layer      │     │  TigerGraph  │
│  OpenGlobus  │     └──────┬───────┘     └──────────────┘
└─────────────┘            │
                     ┌─────┴──────┐
                     │   Kafka /  │
                     │  RabbitMQ  │
                     └─────┬──────┘
                     ┌─────┴──────────────────┐
                     │                        │
              ┌──────┴──────┐         ┌───────┴───────┐
              │   Ingest    │         │  Processing   │
              │  (Python)   │         │   (Python)    │
              │  Scrapers,  │         │  NLP, Entity  │
              │  APIs, RSS  │         │  Extraction   │
              └─────────────┘         └───────────────┘
```

## Development Approach

**Frontend-first.** The strategy is to build a polished, fluid UI/UX before integrating backend services. Test data and mock APIs will stand in for live sources during early development, allowing the team to validate the user experience independently.

Key principles:

- Each data layer should be toggleable and performant on the globe
- Avoid click-heavy navigation patterns — information should surface contextually, not behind menus for each conflict zone
- Design for the intelligence lifecycle: collection → processing → analysis → dissemination

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## References and Inspiration

- [CesiumJS Sandtable — Military Planning](https://cesium.com/blog/2026/01/20/sandtable-military-planning/)
- [Maltego Link Analysis](https://www.maltego.com/blog/infographic-what-is-link-analysis/)
- [Cognyte External Threat Intelligence](https://www.cognyte.com/solutions/external-threat-intelligence/)
- [Deflock.me — ALPR Reporting](https://deflock.me)
- [Intelligence Lifecycle Thread](https://x.com/vamsibatchuk/status/2018861119461372302)

## License

TBD

## Contributing

TBD — contribution guidelines will be established as the project matures.
