# Data Table [tbl-001]

**Type:** Content
**Category:** Data Display
**Purpose:** Full-width table with header row, alternating hover, and consistent cell styling

---

## Overview

Standard data table for listing entities — rooms, menu items, bills, venues. Full width, collapsed borders, header with secondary text, row hover highlight.

---

## Variants

No variants — single implementation with CSS. Content varies by page.

---

## States

**Required States:**
- default — Rows with bottom borders
- hover — Row background #f9fafb

**Optional States:**
- empty — "No data" message when table is empty
- loading — Spinner while data fetches

---

## Styling

### Design Tokens

```yaml
colors:
  header-text: color-text-secondary '#666666'
  cell-border: color-border '#e0e0e0'
  hover-bg: '#f9fafb'

typography:
  header-size: 13px
  header-weight: 600
  cell-size: 14px

spacing:
  cell-padding: '10px 12px'
```

---

## Sub-Elements

- **th** — 13px, weight 600, secondary text color, bottom border, left-aligned
- **td** — 14px, left-aligned, bottom border
- **tr:hover** — Background #f9fafb

---

## Behavior

**Hover:** Row highlights for readability
**Sort/Filter:** Not built into table — handled by parent page components via search inputs and chip filters

---

## Accessibility

**ARIA Attributes:**
- `<table>` semantic element
- `<thead>`, `<tbody>` sections
- `<th>` for column headers

---

## Used In

**Pages:** 7 pages

**Usage Count:** 7 instances

**Examples:**
- MenuListPage — Menu items table with category filter
- BillsPage — Bills list with date, amount, payment method
- VenueListPage — Venues with status filter
- BillDetailPage — Bill line items table
- ActiveSessionPage — Session items table
- ManualBillPage — Custom items table
- DashboardPage — Revenue breakdown table

---

## Version History

**Created:** 2026-06-05
**Last Updated:** 2026-06-05

**Changes:**
- 2026-06-05: Extracted from index.css table, th, td, tr:hover
