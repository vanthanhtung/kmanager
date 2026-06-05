# Design System Components

**Total Components:** 11
**Last Updated:** 2026-06-05

## Component List

### Interactive Components
- Button [btn-001] — Primary, secondary, danger, sm variants
- Chip / Chip Group [chp-001] — Toggleable pill filter buttons
- Language Toggle [tgl-001] — EN/VI dual-button switcher

### Form Components
- Form Group [frm-001] — Label + input/select/textarea wrapper
- Search Input [inp-001] — Search/filter text input

### Layout Components
- Card [crd-001] — White surface container with shadow
- Data Table [tbl-001] — Full-width table with hover rows

### Content Components
- Badge [bdg-001] — Status pill indicators (active/occupied/maintenance)
- Spinner [spn-001] — Circular loading indicator

### Feedback Components
- Modal [mdl-001] — Overlay dialog for CRUD forms and confirmations
- Toast [alt-001] — Slide-in success/error notification

### Navigation Components
- Top Navigation Bar [nav-001] — Global nav with role-based links + lang toggle + logout

---

## Component Naming Convention

**Format:** `[type]-[number]`

Prefixes used:
- btn (button), frm (form), crd (card), tbl (table)
- bdg (badge), mdl (modal), alt (alert/toast)
- inp (input), chp (chip), tgl (toggle)
- spn (spinner), nav (navigation)

## Component File Structure

Each component file includes:
- Component ID and type
- Purpose description
- Variants (if any)
- States
- Design tokens
- Usage tracking
- Accessibility notes
