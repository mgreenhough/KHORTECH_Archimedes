# Khortech Archimedes — Build Log

> Living document tracking development progress.

---

## Product
| | |
|---|---|
| **Name** | Khortech Archimedes |
| **Tagline** | *"Engineer your world."* |
| **Repo** | `KHORTECH_Archimedes` |
| **Deployment** | GitHub Pages |

**Local Dev:** `http://localhost:5174/khortech-archimedes/`

---

## Phase 1: Foundation

### Project Setup
- [x] Initialize Vite + React + TypeScript project
- [x] Install Tailwind CSS v3 + PostCSS + Autoprefixer
- [x] Install dependencies (React Router, Zustand, Lucide, Recharts, clsx, tailwind-merge)
- [x] Configure `vite.config.ts` with `base: '/khortech-archimedes/'`
- [x] Configure `tailwind.config.js` with neon color palette + animations
- [x] Set up Google Fonts (Rubik + Roboto Mono) in `index.html`
- [x] Port `theme.css` into `src/index.css`
- [x] Create `.github/workflows/deploy.yml` for GitHub Pages auto-deploy

### Core Components
- [x] `Sidebar.tsx` — collapsible category tree, favorites, recent, search
- [x] `Header.tsx` — logo, search bar, settings, unit toggle
- [x] `CalculatorShell.tsx` — universal calculator layout wrapper
- [x] `NeonSlider.tsx` — synced slider + number input with unit selector
- [x] `UnitSelector.tsx` — metric/imperial global toggle
- [x] `ResultPanel.tsx` — primary result display + secondary data table
- [x] `FormulaReference.tsx` — expandable formula documentation
- [x] `VisualizationPanel.tsx` — Canvas/SVG/Recharts renderer wrapper

### State & Utilities
- [x] `types/calculator.ts` — shared TypeScript interfaces
- [x] `stores/appStore.ts` — Zustand store (preferences, recent, favorites)
- [x] `lib/units.ts` — unit conversion engine (SI base, metric/imperial)
- [x] `lib/canvasRenderer.ts` — shared Canvas drawing helpers

---

## Phase 2: MVP Calculators

### Mechanics
- [x] **Bell Crank & Lever Mechanical Advantage** — port from `example_bell_crank_calc.py` to Canvas, covers bell cranks and all lever classes
  - [x] `schema.ts` — input/output definitions
  - [x] `calculator.ts` — torque equilibrium logic + driver system
  - [x] `renderer.ts` — Canvas 2D diagram (arms, forces, pivot)
  - [x] `index.tsx` — calculator component

- [x] **Crank Efficiency vs Angle** — normalized torque transmission efficiency for a crank/lever system with fixed force source
  - Shows how efficiency varies as a crank rotates through its arc
  - Reference table of deviation from 90° vs efficiency loss
  - Design helper: compute crank radius (lever length) from desired travel and minimum acceptable efficiency
  - [x] `App.tsx` — calculator component + Canvas diagram + efficiency chart + data table
  - [x] `Sidebar.tsx` — registered under Mechanics category

### Utilities
- [ ] **Unit Converter** — comprehensive engineering unit conversion
  - [ ] Length, mass, force, torque, pressure, power, temperature
  - [ ] Smart parsing + category tabs

### Materials & Stress
- [ ] **Beam Deflection** — simply supported + cantilever
  - [ ] Point loads, UDL, moment loads
  - [ ] Shear + moment diagrams
  - [ ] Deflection curve overlay

### Fasteners
- [ ] **Bolt Torque & Preload** — torque-to-preload with K-factor
  - [ ] Thread friction, bolt tension, tightening specs

### Power Transmission
- [ ] **Spur Gear Design** — module, pitch diameter, center distance
  - [ ] Involute tooth profile visualization
  - [ ] Contact ratio calculation

---

## Phase 3: Core Set (10 more calculators)

### Mechanics
- [ ] Moment & Torque Calculator
- [ ] Friction Analysis
- [ ] Pulley System

### Materials & Stress
- [ ] Stress Concentration
- [ ] Mohr's Circle
- [ ] Torsion in Shafts

### Power Transmission
- [ ] Gear Train Calculator
- [ ] Belt Drive Design

### Fluid Power
- [ ] Hydraulic Cylinder Sizing

---

## Phase 4: Expansion (20+ calculators)

### Mechanics
- [ ] Truss Analyzer
- [ ] Centroid & Moment of Inertia
- [ ] Projectile Motion

### Materials & Stress
- [ ] Column Buckling
- [ ] Thin-Walled Pressure Vessels
- [ ] S-N Curve / Fatigue
- [ ] Weld Strength

### Power Transmission
- [ ] Chain Drive Design
- [ ] Shaft Design
- [ ] Key & Keyway Design
- [ ] Clutch/Brake Design
- [ ] Cam Profile Generator

### Fasteners
- [ ] Thread Data Reference
- [ ] Bolt Group Analysis
- [ ] Rivet Joint Design
- [ ] Press/Shrink Fit

### Fluid Power
- [ ] Pneumatic Flow
- [ ] Pipe Pressure Drop
- [ ] Pump/Motor Sizing
- [ ] Accumulator Sizing

### Springs
- [ ] Compression Spring
- [ ] Extension Spring
- [ ] Torsion Spring
- [ ] Leaf Spring

### Bearings
- [ ] Bearing Life (L10)
- [ ] Journal Bearing
- [ ] Rolling Element Selection

### Thermal
- [ ] Heat Exchanger Sizing
- [ ] Thermal Expansion
- [ ] Convection Coefficient
- [ ] Radiation Heat Transfer

### Manufacturing
- [ ] Cutting Speed & Feed
- [ ] Tap Drill Size
- [ ] Tolerances & Fits

### Utilities
- [ ] Scientific Calculator
- [ ] Material Properties DB
- [ ] Standard Parts Lookup

---

## Phase 5: Polish

### Features
- [ ] Export PNG from Canvas visualizations
- [ ] Export CSV from results tables
- [ ] Preset save/load to localStorage (JSON)
- [ ] Keyboard shortcuts (`Ctrl+K` search, `Ctrl+1-9` calculators)
- [ ] Mobile responsiveness
- [ ] Loading states & skeleton screens
- [ ] Splash screen with animated logo

### Deployment
- [ ] Push to `khortech-archimedes` repo
- [ ] Verify GitHub Actions auto-deploy
- [ ] Test live at `mgreenhough.github.io/khortech-archimedes/`

---

## Notes

| Date | Note |
|------|------|
| 2026-06-19 | Project spec finalized. Name: Khortech Archimedes. Tagline: "Engineer your world." |
| 2026-07-01 | Added Crank Efficiency vs Angle calculator. Fixed NeonSlider build error. |
