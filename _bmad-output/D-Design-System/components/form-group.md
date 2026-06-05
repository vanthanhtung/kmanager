# Form Group [frm-001]

**Type:** Form
**Category:** Input Container
**Purpose:** Standard form field wrapper with label + input/select/textarea — consistent spacing and layout

---

## Overview

The Form Group is the standard wrapper for every form field. Label above input with 4px gap, 14px margin-bottom. Two layout modes: single column (`form-group`) and two-column row (`form-row` — CSS grid 1fr 1fr, collapses to single column at 768px).

---

## Variants

- **single** (`form-group`) — Full-width label + input, 14px margin-bottom
- **row** (`form-row`) — Two form groups side by side via CSS grid, responsive collapse

---

## States

**Required States:**
- default — Label visible, input with border `--color-border`

**Optional States:**
- focused — Input border turns `--color-primary` (#2563eb)

---

## Styling

### Design Tokens

```yaml
colors:
  label: color-text-secondary '#666666'
  input-border: color-border '#e0e0e0'
  input-focus-border: color-primary '#2563eb'
  input-bg: color-surface '#ffffff'

typography:
  label-size: 13px
  label-weight: 500
  input-size: 14px

spacing:
  margin-bottom: 14px
  label-gap: 4px
  input-padding: '8px 12px'
  row-gap: 14px

effects:
  border-radius: var(--radius) '8px'
  transition: 'border-color 0.15s'
```

---

## Sub-Elements

**label** — 13px, weight 500, color `--color-text-secondary`, margin-bottom 4px
**input** — full width, 1px solid border, 14px font, 8px 12px padding, radius
**select** — same styling as input, dropdown arrow
**textarea** — same as input + resize vertical, min-height 60px

---

## Behavior

**Focus:** Border color transitions from `--color-border` → `--color-primary` over 150ms
**Responsive:** `form-row` collapses from 2 columns to 1 column at max-width 768px

---

## Accessibility

**ARIA Attributes:**
- `<label>` linked via native htmlFor or wrapping
- Required fields should have explicit `required` text

**Keyboard Support:**
- Tab between form fields in document order

---

## Used In

**Pages:** 9 pages

**Usage Count:** 40+ instances

**Examples:**
- LoginPage — Username + Password fields
- RoomCheckinPage — Customer name, phone, initial items
- MenuDetailPage — Name EN, Name VI, Code, Price, Category
- VenueManagementPage — Venue name, hotline, wifi, manager credentials
- BillClosePage — Time override, rate override, discount
- ManualBillPage — Custom line items

---

## Related Components

- Button [btn-001] — Typically placed below form groups for submit/cancel

---

## Version History

**Created:** 2026-06-05
**Last Updated:** 2026-06-05

**Changes:**
- 2026-06-05: Extracted from index.css .form-group, .form-row, input, select, textarea, label
