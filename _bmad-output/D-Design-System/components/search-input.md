# Search Input [inp-001]

**Type:** Form
**Category:** Input
**Purpose:** Search/filter text input used across list pages with immediate filtering

---

## Overview

Standard text input styled identically to form inputs but semantically used for search/filter. Same dimensions and styling as other inputs (8px 12px padding, 14px font, `--color-border`). Used on list pages for real-time filtering.

---

## Variants

No CSS variant — same input class. Behavior varies:
- **Client-side filter** — onChange updates filter state (menu list, venue list, room board)
- **Empty placeholder** — "Search..." or i18n equivalent

---

## States

**Required States:**
- default — Border `--color-border`, placeholder text visible
- focused — Border `--color-primary`

## Styling

Uses same tokens as form-group inputs. Not individually styled as a separate class.

---

## Used In

**Pages:** 5 pages

**Usage Count:** 5 instances

**Examples:**
- MenuListPage — Search menu items by name
- VenueListPage — Search venues
- RoomBoardPage — Search rooms
- BillsPage — Search bills

---

## Version History

**Created:** 2026-06-05
