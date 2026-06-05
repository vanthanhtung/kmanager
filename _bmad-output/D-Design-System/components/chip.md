# Chip / Chip Group [chp-001]

**Type:** Interactive
**Category:** Filter Control
**Purpose:** Toggleable pill buttons for category/status filtering — single select, active state highlight

---

## Overview

Rounded pill buttons (16px border-radius) used primarily for filtering lists. Flex row with 6px gap. Individual chip has white background, border, 13px font, 4px 12px padding. Active chip turns primary blue with white text.

---

## Variants

- **default** — White bg, border `--color-border`, text `--color-text`
- **active** — Blue bg (`--color-primary`), white text, border matches

---

## States

**Required States:**
- default — Inactive, white with border
- hover — Border turns `--color-primary`
- active — Primary blue filled

## Styling

### Design Tokens

```yaml
colors:
  default-bg: '#ffffff'
  default-border: color-border '#e0e0e0'
  default-text: color-text '#1a1a1a'
  active-bg: color-primary '#2563eb'
  active-text: '#ffffff'
  hover-border: color-primary '#2563eb'

typography:
  size: 13px

spacing:
  padding: '4px 12px'
  group-gap: 6px

effects:
  border-radius: 16px
  transition: 'all 0.15s'
```

---

## Behavior

**Click:** Selects that chip, deselects others (single-select pattern)
**Hover:** Border highlights to primary color

---

## Used In

**Pages:** 3 pages

**Usage Count:** 3 instances

**Examples:**
- MenuListPage — Category filter (All categories + each menu category)
- VenueListPage — Status filter (All, Active, Inactive)
- RoomBoardPage — Room status filter chips

---

## Version History

**Created:** 2026-06-05
