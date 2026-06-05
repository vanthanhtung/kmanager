# Card [crd-001]

**Type:** Layout
**Category:** Container
**Purpose:** White surface container with shadow — used for room cards, data panels, and content sections

---

## Overview

The Card is the foundational content container in kmanager. White background (`--color-surface`), 8px border-radius (`--radius`), subtle box-shadow (`--shadow`), 16px padding. Used standalone or extended into specialized variants (KPI Card, Room Card).

---

## Variants

- **default** (`card`) — Standard container, 16px padding
- **room-card** — Extended: positioned room card on RoomBoard with status color, room number, elapsed time, current cost
- **kpi-card** (`kpi-card`) — Centered text variant: label (13px, secondary) + value (24px, bold 700)

---

## States

**Required States:**
- default — White bg with shadow

**Optional States:**
- hover — Background tint on room cards (via tr:hover pattern)

---

## Styling

### Design Tokens

```yaml
colors:
  background: color-surface '#ffffff'
  text: color-text '#1a1a1a'
  text-secondary: color-text-secondary '#666666'

typography:
  label-size: 13px
  value-size: 24px
  value-weight: 700

spacing:
  padding: 16px
  kpi-padding: '16px 20px'

effects:
  border-radius: var(--radius) '8px'
  shadow: var(--shadow) '0 1px 3px rgba(0,0,0,0.1)'
```

---

## Behavior

**Static container** — no inherent interactions. Content within card provides behavior.

---

## Accessibility

Native `<div>` element. No special ARIA needed unless used as interactive element.

---

## Used In

**Pages:** 12 pages

**Usage Count:** 30+ instances

**Examples:**
- RoomBoardPage — Room cards (occupied/available/maintenance)
- DashboardPage — 4 KPI cards (revenue, sessions, bills, utilization)
- BillClosePage — Payment summary card
- BillDetailPage — Bill info card
- RoomCheckinPage — Form card
- ActiveSessionPage — Session info card

---

## Related Components

- Room Card — CSS-only variant with status colors
- KPI Card — Specialized card for dashboard metrics

---

## Version History

**Created:** 2026-06-05
**Last Updated:** 2026-06-05

**Changes:**
- 2026-06-05: Extracted from index.css .card and .kpi-card classes
