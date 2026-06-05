# Design Tokens

**Status:** Extracted from codebase
**Source:** `frontend/src/index.css` CSS custom properties
**Last Updated:** 2026-06-05

## Token Categories

### Colors

```yaml
colors:
  # Base
  background: '#f5f5f5'
  surface: '#ffffff'
  border: '#e0e0e0'

  # Text
  text: '#1a1a1a'
  text-secondary: '#666666'

  # Brand
  primary: '#2563eb'
  primary-hover: '#1d4ed8'

  # Semantic
  success: '#16a34a'
  danger: '#dc2626'
  warning: '#f59e0b'

  # Room status
  room-available: '#16a34a'
  room-occupied: '#dc2626'
  room-maintenance: '#6b7280'

  # Badge backgrounds
  badge-active-bg: '#dcfce7'
  badge-inactive-bg: '#f3f4f6'
  badge-occupied-bg: '#fee2e2'

  # Table
  table-hover: '#f9fafb'

  # Modal
  overlay: 'rgba(0, 0, 0, 0.4)'

  # Button secondary
  btn-secondary-hover: '#f0f0f0'
```

### Typography

```yaml
typography:
  # Font families
  font-family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

  # Sizes
  text-xs: 12px   # Badges
  text-sm: 13px   # Labels, chips, lang toggle
  text-base: 14px # Body, inputs, buttons, table cells
  text-lg: 16px   # Brand in nav
  text-xl: 20px   # Page headers
  text-2xl: 24px  # KPI values

  # Weights
  font-normal: 400
  font-medium: 500  # Buttons, labels, badges
  font-semibold: 600 # Table headers, active nav link
  font-bold: 700     # Brand, KPI values

  # Headings
  h1-size: 20px
  h1-weight: 600
```

### Spacing

```yaml
spacing:
  # Padding
  pad-xs: '2px 8px'    # Badges
  pad-sm: '4px 10px'   # Small buttons, chips, lang toggle
  pad-md: '8px 16px'   # Default buttons
  pad-input: '8px 12px' # Inputs, selects, textareas
  pad-card: 16px        # Cards
  pad-card-kpi: '16px 20px' # KPI cards
  pad-modal: 24px       # Modal content
  pad-toast: '12px 20px' # Toast
  pad-main: 20px        # Main content area
  pad-nav-x: 20px       # Nav horizontal

  # Gap
  gap-nav: 12px         # Nav links
  gap-chip: 6px         # Chip group
  gap-page-header: 16px # Page header

  # Margin
  mb-form-group: 14px
  mb-label: 4px
```

### Layout

```yaml
layout:
  # Nav
  nav-height: 56px

  # Modal
  modal-max-width: 600px
  modal-width-pct: 90%
  modal-max-height: 80vh

  # Breakpoints
  breakpoint-mobile: 768px

  # Grid (form-row)
  form-row-columns: '1fr 1fr'
  form-row-gap: 14px

  # Z-index
  z-modal-overlay: 100
  z-toast: 200
```

### Effects

```yaml
effects:
  # Border radius
  radius-default: 8px    # Buttons, inputs, cards
  radius-pill: 12px      # Badges
  radius-chip: 16px      # Chips
  radius-modal: 12px     # Modal content
  radius-lang-first: '4px 0 0 4px'   # Lang toggle EN
  radius-lang-last: '0 4px 4px 0'     # Lang toggle VI

  # Shadow
  shadow-default: '0 1px 3px rgba(0,0,0,0.1)' # Cards
  shadow-modal: '0 4px 24px rgba(0,0,0,0.15)' # Modal

  # Transitions
  transition-button: 'background 0.15s'
  transition-input: 'border-color 0.15s'
  transition-chip: 'all 0.15s'

  # Animations
  anim-toast-slide: 'slideIn 0.3s ease'
  anim-spinner: 'spin 0.6s linear infinite'

  # Spinner
  spinner-size: 24px
  spinner-border: 3px
  spinner-track: '#e0e0e0'
  spinner-active: 'color-primary'
```

### Component-Specific Tokens

```yaml
# Button danger hover (not a CSS var)
button-danger-hover: '#b91c1c'

# Table cell
table-cell-padding: '10px 12px'
```
