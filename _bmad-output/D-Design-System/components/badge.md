# Badge [bdg-001]

**Type:** Content
**Category:** Status Indicator
**Purpose:** Inline status tags showing active/inactive/available/occupied/maintenance states

---

## Overview

Small pill-shaped status indicators. 12px font, 2px 8px padding, 12px border-radius. Five semantic color variants mapped to business states.

---

## Variants

- **badge-active** — Green bg (#dcfce7), green text (`--color-available` #16a34a)
- **badge-inactive** — Gray bg (#f3f4f6), gray text (`--color-maintenance` #6b7280)
- **badge-available** — Same as badge-active (green)
- **badge-occupied** — Red bg (#fee2e2), red text (`--color-occupied` #dc2626)
- **badge-maintenance** — Same as badge-inactive (gray)

---

## States

No interactive states — badges are display-only.

---

## Styling

### Design Tokens

```yaml
colors:
  active-bg: '#dcfce7'
  active-text: '#16a34a'
  inactive-bg: '#f3f4f6'
  inactive-text: '#6b7280'
  occupied-bg: '#fee2e2'
  occupied-text: '#dc2626'

typography:
  size: 12px
  weight: 500

spacing:
  padding: '2px 8px'

effects:
  border-radius: 12px
```

---

## Behavior

Static display element. No interactions.

---

## Accessibility

Color-only information should have screen-reader text for status.

---

## Used In

**Pages:** 6 pages

**Usage Count:** 15+ instances

**Examples:**
- RoomBoardPage — Room status (Available/Occupied/Maintenance)
- VenueListPage — Venue status (Active/Inactive)
- MenuListPage — Menu item active/inactive

---

## Version History

**Created:** 2026-06-05
**Last Updated:** 2026-06-05

**Changes:**
- 2026-06-05: Extracted from index.css .badge variants
