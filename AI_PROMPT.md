# AI Prompt: Build Khortech Archimedes — Mechanical Engineering Toolbox

> Copy and paste this prompt into your AI coding assistant to generate the complete application.

---

## CONTEXT

You are building **Khortech Archimedes**, a client-side web application containing interactive mechanical engineering calculators and visualizers. It deploys as a static site to GitHub Pages — no backend server, no database, all calculations run in the browser.

**Company:** Khortech  
**Product Name:** Khortech Archimedes
**Tagline:** *"Engineer your world."*
**Logo:** `theme_package/LOGO_black_bg.png` (primary for dark UI), `theme_package/LOGO_white_bg.png` (alt)
**Logo Font:** Franklin Gothic
**Logo Color:** `#00E6FF` / `rgb(0, 230, 255)`
**Deployment:** GitHub Pages (static hosting only)

---

## TECH STACK

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Build Tool** | Vite | Fast dev server, optimized builds |
| **Frontend** | React 18 + TypeScript | UI components, state, routing |
| **Styling** | Tailwind CSS v3 | Utility-first CSS with custom theme |
| **Calculations** | TypeScript (client-side) | All math runs in browser |
| **Visualizations** | HTML5 Canvas 2D + SVG + Recharts | Engineering diagrams, charts |
| **State** | Zustand | Global preferences, recent, favorites |
| **Routing** | React Router v6 | SPA navigation |
| **Icons** | Lucide React | Consistent iconography |
| **Deployment** | GitHub Actions → GitHub Pages | Auto-deploy on push |

> **No Python backend.** The original `example_bell_crank_calc.py` using Matplotlib is ported to TypeScript with HTML5 Canvas rendering.

---

## THEME SYSTEM

### Colors (Tailwind Custom)
```javascript
// tailwind.config.js extend
colors: {
  neon: {
    blue: '#00f3ff',
    green: '#39ff14',
    pink: '#ff00ff',
    orange: '#ff9e00',
    red: '#ff3333',
  }
}
```

### Backgrounds
| Class | Hex | Usage |
|-------|-----|-------|
| `bg-gray-950` | `#030712` | Main app background |
| `bg-gray-900` | `#111827` | Cards, panels, modals |
| `bg-gray-800` | `#1f2937` | Inputs, secondary buttons |

### Typography
- **Logo / Display:** Franklin Gothic with `#00E6FF` glow
- **Body:** Rubik (matches khortech.com.au)
- **Code / Data:** Roboto Mono (matches khortech.com.au)

### Neon Title Glow
```css
.neon-title {
  font-family: 'Franklin Gothic', sans-serif;
  color: #fff;
  text-shadow:
    0 0 5px #00E6FF,
    0 0 10px #00E6FF,
    0 0 20px #00E6FF,
    0 0 40px #00a3ff,
    0 0 80px #00a3ff;
  letter-spacing: 0.1em;
}
```

### Utility Classes (theme.css)
```css
.btn-primary { @apply px-4 py-2 bg-neon-blue/20 text-neon-blue border border-neon-blue/40 rounded-lg text-sm font-medium hover:bg-neon-blue/30 transition-colors; }
.btn-ghost { @apply px-4 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors; }
.btn-danger { @apply text-neon-red bg-neon-red/10 px-3 py-2 rounded text-xs font-medium; }
.card { @apply relative rounded-xl p-4 flex flex-col gap-3 border-2 transition-all duration-200; }
.card-front { @apply bg-gray-950 border-gray-700; }
.card-back { @apply bg-gray-900/80 border-gray-700; }
.input-neon { @apply bg-transparent border-b border-neon-blue text-white outline-none focus:border-neon-blue transition-colors; }
.scrollbar-thin { /* custom thin scrollbar */ }
.tap-active:active { opacity: 0.7; }
.touch-manipulation { touch-action: manipulation; }
```

### Animations
```css
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in { animation: fadeIn 0.2s ease-out both; }
.animate-fade-in-up { animation: fadeInUp 0.25s ease-out both; }
```

---

## APPLICATION ARCHITECTURE

### Global Layout
```
┌─────────────────────────────────────────────────────────────┐
│  [☰] KHORTECH ARCHIMEDES    [🔍 Search calculators...] [⚙️] │
├──────────┬──────────────────────────────────────────────────┤
│          │  [Breadcrumb: Mechanics > Bell Crank]         [?]│
│  NAV     ├──────────────────────────────────────────────────┤
│  SIDEBAR │                                                  │
│          │  ┌──────────────────┐  ┌─────────────────────┐  │
│ ⚙️ MECH  │  │                  │  │                     │  │
│   Bell   │  │  VISUALIZATION   │  │   INPUT PANEL       │  │
│   Lever  │  │  (Canvas 2D)     │  │   • Sliders         │  │
│   ...    │  │                  │  │   • Number inputs   │  │
│          │  │                  │  │   • Unit toggles    │  │
│ 🔩 FAST  │  └──────────────────┘  └─────────────────────┘  │
│   ...    │  ┌─────────────────────────────────────────────┐ │
│          │  │   RESULTS PANEL                             │ │
│ 🌀 POWER │  │   • Primary result (big neon-green)         │ │
│   ...    │  │   • Secondary data table                    │ │
│          │  │   • Formula reference (expandable)          │ │
│          │  │   • Export PNG / Copy values                │ │
│          │  └─────────────────────────────────────────────┘ │
└──────────┴──────────────────────────────────────────────────┘
```

### Navigation Sidebar
Categories with emoji icons:
- ⚙️ **Mechanics** — Bell Crank & Lever MA, Moment & Torque, Friction, Pulley, Truss, Centroid, Projectile
- 📐 **Materials & Stress** — Beam Deflection, Stress Concentration, Buckling, Torsion, Mohr's Circle, Fatigue
- 🌀 **Power Transmission** — Spur Gear, Gear Train, Belt Drive, Chain Drive, Shaft Design
- 🔩 **Fasteners** — Bolt Torque, Thread Data, Bolt Group, Rivet Joint
- 💧 **Fluid Power** — Hydraulic Cylinder, Pneumatic Flow, Pipe Pressure Drop
- 🌀 **Springs** — Compression, Extension, Torsion, Leaf
- ⚙️ **Bearings** — L10 Life, Journal Bearing
- 🌡️ **Thermal** — Heat Exchanger, Thermal Expansion
- 🏭 **Manufacturing** — Cutting Speed, Tap Drill, Tolerances
- ⚡ **Utilities** — Unit Converter, Material DB

Features:
- Collapsible accordion categories
- **Favorites** section (localStorage)
- **Recent** section (last 5 used, localStorage)
- **Fuzzy search** (`Ctrl+K`)
- Active calculator highlighted with left neon-blue border (`border-l-4 border-neon-blue`)

### Universal Calculator Template

```typescript
// types/calculator.ts
export interface CalculatorSchema {
  id: string;
  name: string;
  category: string;
  description: string;
  inputs: InputField[];
  outputs: OutputField[];
  visualizationType: 'canvas' | 'svg' | 'recharts' | 'none';
  formulaReference: string; // Markdown
}

export interface InputField {
  key: string;
  label: string;
  type: 'slider' | 'number' | 'select' | 'boolean';
  min?: number;
  max?: number;
  step?: number;
  default: number | string | boolean;
  unit?: string;
  unitOptions?: string[];
}

export interface OutputField {
  key: string;
  label: string;
  formula: string;
  precision: number;
  unit?: string;
  highlight?: 'primary' | 'secondary' | 'warning';
}
```

**Input Panel Requirements:**
- Each input is a `NeonSlider` component: horizontal slider + number text input, bidirectionally synced
- Unit dropdown next to each input
- Global metric/imperial toggle in header — converts ALL displayed values instantly
- Reset to defaults button
- Preset save/load (JSON to localStorage)

**Visualization Panel Requirements:**
- HTML5 Canvas 2D for engineering diagrams
- Recharts for plots/charts (S-N curves, pressure drops, etc.)
- SVG for static technical drawings (thread profiles, tolerance zones)
- Export PNG: `canvas.toDataURL()` download trigger
- Real-time updates during slider drag (requestAnimationFrame, throttled)

**Results Panel Requirements:**
- Primary result: large text (`text-3xl font-bold text-neon-green`)
- Secondary results: table with copy-to-clipboard buttons
- Formula reference: collapsible `<details>` element with Markdown
- Warning: neon-orange text when near limits
- Error: neon-red pulse animation when invalid

---

## CALCULATOR CATALOG (40+ Tools)

### Category 1: Mechanics
| # | Calculator | Viz |
|---|-----------|-----|
| 1.1 | **Bell Crank & Lever Mechanical Advantage** | Canvas |
| 1.2 | **Moment & Torque Calculator** | Canvas |
| 1.3 | **Friction Analysis** | Canvas |
| 1.4 | **Pulley System** | Canvas |
| 1.5 | **Truss Analyzer** | Canvas |
| 1.6 | **Centroid & Moment of Inertia** | Canvas |
| 1.7 | **Projectile Motion** | Canvas |

### Category 2: Materials & Stress
| # | Calculator | Viz |
|---|-----------|-----|
| 2.1 | **Beam Deflection** | Canvas |
| 2.2 | **Stress Concentration** | Canvas |
| 2.3 | **Column Buckling** | Canvas |
| 2.4 | **Torsion in Shafts** | Canvas |
| 2.5 | **Thin-Walled Pressure Vessels** | Canvas |
| 2.6 | **Mohr's Circle** | Canvas |
| 2.7 | **S-N Curve / Fatigue** | Recharts |
| 2.8 | **Weld Strength** | Canvas |

### Category 3: Power Transmission
| # | Calculator | Viz |
|---|-----------|-----|
| 3.1 | **Spur Gear Design** | Canvas |
| 3.2 | **Gear Train Calculator** | Canvas |
| 3.3 | **Belt Drive Design** | Canvas |
| 3.4 | **Chain Drive Design** | Canvas |
| 3.5 | **Shaft Design** | Canvas |
| 3.6 | **Key & Keyway Design** | Canvas |
| 3.7 | **Clutch/Brake Design** | Canvas |
| 3.8 | **Cam Profile Generator** | Canvas + Recharts |

### Category 4: Fasteners & Joining
| # | Calculator | Viz |
|---|-----------|-----|
| 4.1 | **Bolt Torque & Preload** | Canvas |
| 4.2 | **Thread Data Reference** | SVG |
| 4.3 | **Bolt Group Analysis** | Canvas |
| 4.4 | **Rivet Joint Design** | Canvas |
| 4.5 | **Press/Shrink Fit** | Canvas |

### Category 5: Fluid Power
| # | Calculator | Viz |
|---|-----------|-----|
| 5.1 | **Hydraulic Cylinder Sizing** | Canvas |
| 5.2 | **Pneumatic Flow** | Canvas |
| 5.3 | **Pipe Pressure Drop** | Recharts |
| 5.4 | **Pump/Motor Sizing** | Canvas |
| 5.5 | **Accumulator Sizing** | Recharts |

### Category 6: Springs
| # | Calculator | Viz |
|---|-----------|-----|
| 6.1 | **Compression Spring** | Canvas |
| 6.2 | **Extension Spring** | Canvas |
| 6.3 | **Torsion Spring** | Canvas |
| 6.4 | **Leaf Spring** | Canvas |

### Category 7: Bearings
| # | Calculator | Viz |
|---|-----------|-----|
| 7.1 | **Bearing Life (L10)** | Canvas |
| 7.2 | **Journal Bearing** | Canvas |
| 7.3 | **Rolling Element Selection** | Table |

### Category 8: Thermal
| # | Calculator | Viz |
|---|-----------|-----|
| 8.1 | **Heat Exchanger Sizing** | Recharts |
| 8.2 | **Thermal Expansion** | Canvas |
| 8.3 | **Convection Coefficient** | Table |
| 8.4 | **Radiation Heat Transfer** | Canvas |

### Category 9: Manufacturing
| # | Calculator | Viz |
|---|-----------|-----|
| 9.1 | **Cutting Speed & Feed** | Canvas |
| 9.2 | **Tap Drill Size** | Table |
| 9.3 | **Tolerances & Fits** | Canvas |

### Category 10: Utilities
| # | Calculator | Viz |
|---|-----------|-----|
| 10.1 | **Unit Converter** | None |
| 10.2 | **Scientific Calculator** | None |
| 10.3 | **Material Properties DB** | Table + Recharts |
| 10.4 | **Standard Parts Lookup** | Table |

---

## FIRST CALCULATOR: BELL CRANK & LEVER MECHANICAL ADVANTAGE

Port `example_bell_crank_calc.py` to TypeScript + Canvas.

### Input Schema
| Key | Label | Type | Min | Max | Default | Unit |
|-----|-------|------|-----|-----|---------|------|
| `r_in` | Input Radius | slider+number | 0.1 | 2.5 | 1.0 | m |
| `r_out` | Output Radius | slider+number | 0.1 | 1.75 | 0.7 | m |
| `a_in` | Input Angle | slider+number | -180 | 180 | 30 | ° |
| `a_out` | Output Angle | slider+number | -180 | 180 | 120 | ° |
| `fin_dir` | Input Force Direction | slider+number | -180 | 180 | 80 | ° |
| `fout_dir` | Output Force Direction | slider+number | -180 | 180 | -20 | ° |
| `fin` | Input Force | slider+number | 0 | 100 | 50 | N |
| `fout` | Output Force | slider+number | 0 | 100 | 50 | N |

### Calculation Logic (TypeScript)
```typescript
function vec(angleDeg: number, length: number): [number, number] {
  const a = (angleDeg * Math.PI) / 180;
  return [Math.cos(a) * length, Math.sin(a) * length];
}

function torque(r: number, F: number, armAngle: number, forceAngle: number): number {
  return r * F * Math.sin(((forceAngle - armAngle) * Math.PI) / 180);
}

// Driver logic:
// If fin was last touched: solve fout from equilibrium
// If fout was last touched: solve fin from equilibrium
// Guard abs(sin) < 1e-6 → set other force to 0
```

### Canvas Visualization
Draw on HTML5 Canvas:
- Black pivot dot at center
- Red line: input arm (pivot → in_end)
- Blue line: output arm (pivot → out_end)
- Red arrow: input force vector at in_end
- Blue arrow: output force vector at out_end
- Light grid lines
- Auto-scale with 0.3 padding

### Results
- Driver indicator
- Input/Output Force (N)
- Input/Output Torque (N·m)
- Mechanical Advantage ratio

---

## FILE STRUCTURE

```
khortech-archimedes/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages auto-deploy
├── public/
│   └── (static assets)
├── src/
│   ├── main.tsx                # React entry
│   ├── App.tsx                 # Root with router
│   ├── index.css               # Tailwind + theme.css
│   ├── types/
│   │   └── calculator.ts       # Shared interfaces
│   ├── stores/
│   │   └── appStore.ts         # Zustand store
│   ├── lib/
│   │   ├── units.ts            # Unit conversion engine
│   │   └── canvasRenderer.ts   # Shared Canvas helpers
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── CalculatorShell.tsx
│   │   ├── NeonSlider.tsx
│   │   ├── UnitSelector.tsx
│   │   ├── ResultPanel.tsx
│   │   ├── FormulaReference.tsx
│   │   └── VisualizationPanel.tsx
│   └── calculators/
│       ├── mechanics/
│       │   └── BellCrank/
│       │       ├── index.tsx
│       │       ├── schema.ts
│       │       ├── calculator.ts
│       │       └── renderer.ts
│       └── (other categories...)
├── index.html                  # Rubik + Roboto Mono Google Fonts
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts              # base: '/khortech-archimedes/'
├── package.json
├── tsconfig.json
└── README.md
```

---

## CRITICAL REQUIREMENTS

1. **Every calculator is self-contained** in its own folder: `index.tsx`, `schema.ts`, `calculator.ts`, `renderer.ts`
2. **All inputs use NeonSlider** — slider + number input, synced, with neon styling
3. **No external UI libraries** (no MUI, no Bootstrap) — only Tailwind + custom CSS
4. **Dark theme only** — no light mode toggle
5. **All calculations in TypeScript** — no Python, no backend API calls
6. **Canvas for engineering diagrams** — no Matplotlib, no external image generation
7. **Unit system toggle** globally converts all inputs/outputs between metric and imperial
8. **Formulas visible** in expandable reference panel for every calculator
9. **GitHub Pages deployable** — `vite.config.ts` has `base: '/khortech-archimedes/'`

---

## PROJECT SETUP COMMANDS

```bash
# 1. Initialize project
npm create vite@latest khortech-archimedes -- --template react-ts
cd khortech-archimedes

# 2. Install Tailwind
npm install -D tailwindcss@^3.4 postcss autoprefixer
npx tailwindcss init -p

# 3. Install dependencies
npm install react-router-dom zustand lucide-react recharts clsx tailwind-merge

# 4. Configure vite.config.ts for GitHub Pages
# Add: base: '/khortech-archimedes/'

# 5. Configure tailwind.config.js with custom colors
# Add neon palette and animations

# 6. Copy theme.css content into src/index.css
# Add Rubik + Roboto Mono Google Fonts to index.html
```

---

## DEPLOYMENT (GitHub Actions)

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## MVP PRIORITY (Implement First)

1. **Bell Crank & Lever Mechanical Advantage** — Port from Python example, covers bell cranks and all lever classes
2. **Unit Converter** — Comprehensive engineering units
3. **Beam Deflection** — Simply supported, cantilever
4. **Bolt Torque & Preload**
5. **Spur Gear Design**

---

## SUCCESS CRITERIA

- [ ] App builds and runs locally with `npm run dev`
- [ ] Sidebar shows all calculator categories with icons
- [ ] Clicking calculator loads inputs, visualization, and results
- [ ] Slider drag updates Canvas visualization in real-time
- [ ] Unit toggle (metric/imperial) converts all values correctly
- [ ] Formula reference panel expands/collapses
- [ ] Export PNG works for Canvas visualizations
- [ ] `npm run build` produces static files for GitHub Pages
- [ ] Franklin Gothic logo display, Rubik body text, Roboto Mono data
- [ ] Neon color scheme applied consistently throughout
- [ ] Khortech Archimedes title in header with blue glow

Generate the complete, working codebase for this application.