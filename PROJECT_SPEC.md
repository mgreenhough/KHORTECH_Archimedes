# Khortech Archimedes — Mechanical Engineering Toolbox

## Deployment Target
**GitHub Pages** (same as https://mgreenhough.github.io/Project_Tracker/)  
→ Static SPA, no backend server, all client-side execution

---

## Architecture (GitHub Pages Compatible)

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 + TypeScript + Vite | UI, routing, state management |
| **Styling** | Tailwind CSS v3 + custom theme.css | Dark cyberpunk neon aesthetic |
| **Calculations** | TypeScript (client-side) | All math runs in browser — no Python backend |
| **Visualizations** | HTML5 Canvas + SVG + Recharts | 2D diagrams rendered natively in browser |
| **Deployment** | GitHub Pages via GitHub Actions | Auto-deploy on push to `main` |
| **Domain** | `https://mgreenhough.github.io/khortech-archimedes/` or custom |

> **Note:** Since GitHub Pages is static hosting, the Python/matplotlib approach from `example_bell_crank_calc.py` is replaced with Canvas/SVG rendering in TypeScript. All calculator logic ports directly to TS.

---

## Brand Identity

| Element | Specification |
|---------|---------------|
| **Product Name** | Khortech Archimedes |
| **Tagline** | *"Engineer your world."* |
| **Company** | Khortech |
| **Visual Theme** | Dark cyberpunk / neon-tech (from `theme_package`) |
| **Logo** | `theme_package/LOGO_black_bg.png` (primary), `theme_package/LOGO_white_bg.png` (alt) |
| **Logo Font** | Franklin Gothic |
| **Logo Color** | `#00E6FF` / `rgb(0, 230, 255)` |

---

## Visual Design Specification

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `neon-blue` | `#00f3ff` | Primary actions, focus states, borders |
| `neon-green` | `#39ff14` | Success, calculated results |
| `neon-pink` | `#ff00ff` | Accent highlights |
| `neon-orange` | `#ff9e00` | Warnings, hold states |
| `neon-red` | `#ff3333` | Danger, errors |

### Backgrounds
| Class | Hex | Usage |
|-------|-----|-------|
| `bg-gray-950` | `#030712` | Main app background |
| `bg-gray-900` | `#111827` | Cards, panels |
| `bg-gray-800` | `#1f2937` | Inputs, secondary buttons |

### Typography
- **Logo / Display:** Franklin Gothic — `.neon-title` with `#00E6FF` glow
- **Body:** Rubik (matches khortech.com.au)
- **Code / Data:** Roboto Mono (matches khortech.com.au)

### Key CSS Utilities (from theme_package)
```css
.neon-title { font-family: 'Franklin Gothic', sans-serif; text-shadow: 0 0 5px #00E6FF, ...; }
.btn-primary { @apply px-4 py-2 bg-neon-blue/20 text-neon-blue border border-neon-blue/40 rounded-lg; }
.btn-ghost { @apply px-4 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg; }
.card { @apply relative rounded-xl p-4 flex flex-col gap-3 border-2; }
.card-front { @apply bg-gray-950 border-gray-700; }
.input-neon { @apply bg-transparent border-b border-neon-blue text-white outline-none; }
```

---

## Core UI Structure

### 1. Splash Screen
- Animated Khortech Archimedes logo with neon glow
- Loading bar
- Tagline: *"Engineer your world."*

### 2. Main Layout
```
┌─────────────────────────────────────────────────────────────┐
│  [☰] KHORTECH ARCHIMEDES    [🔍 Search...]    [⚙️] [📖]  │
├──────────┬──────────────────────────────────────────────────┤
│          │  [Breadcrumb: Mechanics > Bell Crank]         [?]│
│  NAV     ├──────────────────────────────────────────────────┤
│  SIDEBAR │                                                  │
│          │  ┌──────────────────┐  ┌─────────────────────┐  │
│ ⚙️ MECH  │  │                  │  │                     │  │
│   Bell   │  │  VISUALIZATION   │  │   INPUT PANEL       │  │
│   Lever  │  │  (Canvas/SVG)    │  │   • Sliders         │  │
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

### 3. Navigation Sidebar
- Collapsible category tree with emoji icons
- **Favorites** section (pinned by user)
- **Recent** section (last 5 used)
- **Fuzzy search** (`Ctrl+K`)
- Active calculator: left neon-blue border

---

## Complete Calculator Catalog

### Category 1: Mechanics
| # | Calculator | Description | Viz Type |
|---|-----------|-------------|----------|
| 1.1 | **Bell Crank & Lever Mechanical Advantage** | Bell cranks + 1st/2nd/3rd class levers | Canvas 2D |
| 1.2 | **Moment & Torque Calculator** | Force × distance, vectors | Canvas 2D |
| 1.3 | **Friction Analysis** | Static/kinetic, wedges, inclines | Canvas 2D |
| 1.4 | **Pulley System** | Block & tackle, MA | Canvas 2D |
| 1.5 | **Truss Analyzer** | Method of joints/sections | Canvas 2D |
| 1.6 | **Centroid & Moment of Inertia** | Composite shapes | Canvas 2D |
| 1.7 | **Projectile Motion** | Trajectory, range, height | Canvas 2D |

### Category 2: Materials & Stress
| # | Calculator | Description | Viz Type |
|---|-----------|-------------|----------|
| 2.1 | **Beam Deflection** | Simply supported, cantilever, UDL | Canvas 2D |
| 2.2 | **Stress Concentration** | K-factors for holes, fillets | Canvas heatmap |
| 2.3 | **Column Buckling** | Euler, Johnson, slenderness | Canvas 2D |
| 2.4 | **Torsion in Shafts** | Shear stress, angle of twist | Canvas 2D |
| 2.5 | **Thin-Walled Pressure Vessels** | Hoop/longitudinal stress | Canvas 2D |
| 2.6 | **Mohr's Circle** | Principal stresses, transformation | Canvas 2D |
| 2.7 | **S-N Curve / Fatigue** | Endurance, life estimation | Recharts |
| 2.8 | **Weld Strength** | Fillet/butt weld stress | Canvas 2D |

### Category 3: Power Transmission
| # | Calculator | Description | Viz Type |
|---|-----------|-------------|----------|
| 3.1 | **Spur Gear Design** | Module, pitch, contact ratio | Canvas 2D |
| 3.2 | **Gear Train Calculator** | Compound, planetary ratios | Canvas 2D |
| 3.3 | **Belt Drive Design** | V-belt, timing belt, length | Canvas 2D |
| 3.4 | **Chain Drive Design** | Roller chain, sprockets | Canvas 2D |
| 3.5 | **Shaft Design** | Combined bending + torsion | Canvas 2D |
| 3.6 | **Key & Keyway Design** | Shear, crushing stress | Canvas 2D |
| 3.7 | **Clutch/Brake Design** | Friction torque capacity | Canvas 2D |
| 3.8 | **Cam Profile Generator** | Displacement diagrams | Canvas 2D + Recharts |

### Category 4: Fasteners & Joining
| # | Calculator | Description | Viz Type |
|---|-----------|-------------|----------|
| 4.1 | **Bolt Torque & Preload** | Torque-to-preload, K-factor | Canvas 2D |
| 4.2 | **Thread Data Reference** | Metric/UNC/UNF dimensions | SVG |
| 4.3 | **Bolt Group Analysis** | Eccentric loading | Canvas 2D |
| 4.4 | **Rivet Joint Design** | Lap/butt joints | Canvas 2D |
| 4.5 | **Press/Shrink Fit** | Interference, contact pressure | Canvas 2D |

### Category 5: Fluid Power
| # | Calculator | Description | Viz Type |
|---|-----------|-------------|----------|
| 5.1 | **Hydraulic Cylinder Sizing** | Force, bore, rod, pressure | Canvas 2D |
| 5.2 | **Pneumatic Flow** | Orifice flow, Cv sizing | Canvas 2D |
| 5.3 | **Pipe Pressure Drop** | Darcy-Weisbach, Reynolds | Recharts |
| 5.4 | **Pump/Motor Sizing** | Hydraulic power | Canvas 2D |
| 5.5 | **Accumulator Sizing** | Gas pre-charge, P-V diagram | Recharts |

### Category 6: Springs
| # | Calculator | Description | Viz Type |
|---|-----------|-------------|----------|
| 6.1 | **Compression Spring** | Wahl factor, solid height | Canvas 2D |
| 6.2 | **Extension Spring** | Initial tension, hooks | Canvas 2D |
| 6.3 | **Torsion Spring** | Torque, angular deflection | Canvas 2D |
| 6.4 | **Leaf Spring** | Stress, deflection, nip | Canvas 2D |

### Category 7: Bearings
| # | Calculator | Description | Viz Type |
|---|-----------|-------------|----------|
| 7.1 | **Bearing Life (L10)** | Rating life, adjustment factors | Canvas 2D |
| 7.2 | **Journal Bearing** | Sommerfeld, film thickness | Canvas 2D |
| 7.3 | **Rolling Element Selection** | Load ratings, fits | Table |

### Category 8: Thermal
| # | Calculator | Description | Viz Type |
|---|-----------|-------------|----------|
| 8.1 | **Heat Exchanger Sizing** | LMTD, effectiveness-NTU | Recharts |
| 8.2 | **Thermal Expansion** | Linear/volumetric, constrained stress | Canvas 2D |
| 8.3 | **Convection Coefficient** | Natural/forced convection | Table |
| 8.4 | **Radiation Heat Transfer** | View factors, graybody | Canvas 2D |

### Category 9: Manufacturing
| # | Calculator | Description | Viz Type |
|---|-----------|-------------|----------|
| 9.1 | **Cutting Speed & Feed** | Turning, milling, drilling | Canvas 2D |
| 9.2 | **Tap Drill Size** | Metric/imperial charts | Table |
| 9.3 | **Tolerances & Fits** | ISO hole/shafts | Canvas 2D |

### Category 10: Utilities
| # | Calculator | Description | Viz Type |
|---|-----------|-------------|----------|
| 10.1 | **Unit Converter** | Engineering unit conversion | N/A |
| 10.2 | **Scientific Calculator** | Advanced with engineering notation | N/A |
| 10.3 | **Material Properties DB** | Metals, plastics, ceramics | Table + Recharts |
| 10.4 | **Standard Parts Lookup** | I-beams, pipes, DIN/ISO/ANSI | Table |

---

## Universal Calculator Template

Every calculator follows this schema:

```typescript
interface CalculatorSchema {
  id: string;
  name: string;
  category: string;
  description: string;
  inputs: InputField[];
  outputs: OutputField[];
  visualizationType: 'canvas' | 'svg' | 'recharts' | 'none';
  formulaReference: string; // Markdown or LaTeX
}

interface InputField {
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

interface OutputField {
  key: string;
  label: string;
  formula: string;
  precision: number;
  unit?: string;
  highlight?: 'primary' | 'secondary' | 'warning';
}
```

---

## File Structure

```
khortech-archimedes/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages auto-deploy
├── public/
│   └── (static assets)
├── src/
│   ├── main.tsx                    # React entry
│   ├── App.tsx                     # Root with router
│   ├── index.css                   # Tailwind directives + theme.css content
│   ├── types/
│   │   └── calculator.ts           # Shared interfaces
│   ├── stores/
│   │   └── appStore.ts             # Zustand: preferences, recent, favorites
│   ├── lib/
│   │   ├── units.ts                # Unit conversion engine
│   │   └── canvasRenderer.ts       # Shared Canvas drawing helpers
│   ├── components/
│   │   ├── Sidebar.tsx             # Navigation sidebar
│   │   ├── Header.tsx              # Top bar with search
│   │   ├── CalculatorShell.tsx     # Universal calculator layout
│   │   ├── NeonSlider.tsx          # Themed slider + number input
│   │   ├── UnitSelector.tsx        # Metric/imperial toggle
│   │   ├── ResultPanel.tsx         # Results display
│   │   ├── FormulaReference.tsx    # Expandable formula docs
│   │   └── VisualizationPanel.tsx  # Canvas/SVG/Recharts wrapper
│   └── calculators/                # One folder per calculator
│       ├── mechanics/
│       │   ├── BellCrank/
│       │   │   ├── index.tsx       # Calculator component
│       │   │   ├── schema.ts       # Input/output definitions
│       │   │   ├── calculator.ts   # Pure calculation logic
│       │   │   └── renderer.ts     # Canvas drawing function
│       │   └── ...
│       └── ...
├── index.html                      # Rubik + Roboto Mono Google Fonts
├── tailwind.config.js              # Custom neon colors + animations
├── postcss.config.js
├── vite.config.ts                  # Base path for GitHub Pages
├── package.json
├── tsconfig.json
└── README.md
```

---

## Deployment (GitHub Pages)

### `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/khortech-archimedes/', // Repo name for GitHub Pages
})
```

### `.github/workflows/deploy.yml`
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

## Implementation Roadmap

### Phase 1: Foundation
- [ ] Initialize Vite + React + TypeScript
- [ ] Configure Tailwind with neon theme
- [ ] Create shell: Sidebar, Header, CalculatorShell
- [ ] Build NeonSlider, UnitSelector, ResultPanel components
- [ ] Set up Zustand store (preferences, recent, favorites)
- [ ] Create unit conversion engine

### Phase 2: MVP Calculators
- [ ] **Bell Crank Calculator** (port from `example_bell_crank_calc.py` to Canvas)
- [ ] **Unit Converter**
- [ ] **Beam Deflection**
- [ ] **Bolt Torque & Preload**
- [ ] **Spur Gear Design**

### Phase 3: Core Set (10 more)
- [ ] Moment/Torque, Friction, Pulley
- [ ] Stress Concentration, Mohr's Circle, Torsion
- [ ] Gear Train, Belt Drive, Hydraulic Cylinder

### Phase 4: Expansion
- [ ] Remaining calculators (20+)
- [ ] Material Properties DB
- [ ] Export PNG/CSV functionality
- [ ] Preset save/load (localStorage)

### Phase 5: Polish
- [ ] GitHub Actions deployment
- [ ] Mobile responsiveness
- [ ] Keyboard shortcuts
- [ ] Loading states & animations

---

## Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **No Python backend** | All TS client-side | GitHub Pages is static-only |
| **Canvas over Matplotlib** | HTML5 Canvas API | Native browser rendering, no server |
| **Unit conversions** | TS engine with SI base | All inputs stored in SI, displayed in chosen unit |
| **State persistence** | localStorage | No database needed |
| **Export** | PNG (Canvas.toDataURL), CSV (Blob) | Client-side generation |

---

## Next Steps

1. Approve this GitHub Pages architecture
2. Create GitHub repo `khortech-archimedes`
3. Initialize Vite project and configure deployment
4. Port `theme_package` into global CSS
5. Build first calculator (Bell Crank) as proof-of-concept