# Neon Cyberpunk Theme Package

A reusable dark cyberpunk/neon theme extracted from the Project Tracker app. Built for Tailwind CSS v3.

## What's Included

| File | Purpose |
|------|---------|
| `tailwind.config.js` | Extended Tailwind config with custom neon color palette and keyframe animations |
| `theme.css` | Global styles, CSS variables, custom utility classes (buttons, cards, inputs, modals, badges) |
| `postcss.config.js` | PostCSS pipeline (Tailwind + Autoprefixer) |
| `index.html` | HTML template with Google Fonts (Orbitron + Inter) preconnected |

## Dependencies

Install these in your new project:

```bash
npm install -D tailwindcss@^3.4.19 postcss@^8.5.10 autoprefixer@^10.5.0
npm install clsx tailwind-merge
```

> `clsx` and `tailwind-merge` are optional but highly recommended for composing class names cleanly.

## Quick Start

1. **Copy all files** from this folder into your project's root (or `frontend/` if using a monorepo).

2. **Import the CSS** in your main entry file (e.g., `src/main.tsx` or `src/main.js`):
   ```tsx
   import './theme.css'
   ```

3. **Ensure your build tool** (Vite, Next.js, etc.) is configured to process PostCSS. Most modern setups do this automatically if `postcss.config.js` exists at the project root.

## Design Tokens

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `neon-blue` | `#00f3ff` | Primary actions, focus states, borders |
| `neon-green` | `#39ff14` | Success, complete states, running indicators |
| `neon-pink` | `#ff00ff` | Accent |
| `neon-orange` | `#ff9e00` | Warnings, hold states, check-in prompts |
| `neon-red` | `#ff3333` | Danger, delete, urgent due dates |

### Grays (Tailwind defaults)

| Class | Usage |
|-------|-------|
| `bg-gray-950` | Main app background |
| `bg-gray-900` | Cards, panels, modals |
| `bg-gray-800` | Inputs, secondary buttons |
| `text-gray-200` | Secondary text |
| `text-gray-300` | Muted text |
| `text-gray-400` | Placeholders, hints |
| `text-gray-500` | Disabled, very subtle |
| `text-gray-600` | Empty states, "no items" |

### Typography

- **Display/Logo:** `Orbitron` (Google Fonts) — use with `.neon-title` class for the glow effect.
- **Body:** `Inter` (system fallback) — default on `body`.

## Utility Classes

### Buttons
```html
<button class="btn-primary">Primary Action</button>
<button class="btn-ghost">Secondary Action</button>
<button class="btn-danger">Confirm Delete</button>
```

### Cards
```html
<div class="card card-front">I'm the active/front card</div>
<div class="card card-back">I'm a background card</div>
```

### Inputs
```html
<input class="input-neon" placeholder="Type here..." />
```

### Modals
```html
<div class="modal-backdrop">
  <div class="modal-panel">
    <h2>Modal Title</h2>
    <p>Modal content...</p>
  </div>
</div>
```

### Badges
```html
<span class="badge-public">Public</span>
<span class="badge-private">Private</span>
```

## Animations

| Class | Effect |
|-------|--------|
| `animate-fade-in` | Opacity 0 → 1, 0.2s ease-out |
| `animate-fade-in-up` | Opacity 0 + translateY(12px) → visible, 0.25s ease-out |

## Custom Scrollbars

Use `scrollbar-thin` class on scrollable containers. Custom styled for desktop, auto-hidden on mobile (`< 768px`).

## Touch / Mobile Optimizations

| Class | Purpose |
|-------|---------|
| `tap-active` | Opacity drops to 0.7 on `:active` |
| `touch-manipulation` | Prevents double-tap zoom on drag handles |

## Example: Neon Title

```html
<h1 class="neon-title">My App</h1>
```

This applies the Orbitron font with a multi-layer cyan glow text-shadow.

---

**Tip:** If you want the *exact* Tailwind classes used across all components, search the original project's `frontend/src/components/*.tsx` files for patterns like `bg-neon-`, `text-neon-`, `border-neon-`, `active:bg-white/5`, etc.