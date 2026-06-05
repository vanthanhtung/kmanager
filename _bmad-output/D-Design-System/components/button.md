# Button [btn-001]

**Type:** Interactive
**Category:** Action
**Purpose:** Trigger actions — primary, secondary, danger — with consistent sizing and disabled state

---

## Overview

Buttons are the primary action trigger in kmanager. Four variants + two sizes cover all use cases. All share the same base: border-radius `var(--radius)` (8px), padding 8px 16px, font-size 14px, weight 500, 150ms background transition.

---

## Variants

- **primary** (`btn-primary`) — Main call-to-action (save, submit, check-in). Blue bg (#2563eb), white text
- **secondary** (`btn-secondary`) — Neutral actions (cancel, back, filters). White bg, border, dark text
- **danger** (`btn-danger`) — Destructive actions (delete, close session). Red bg (#dc2626), white text
- **sm** (`btn-sm`) — Compact variant (padding 4px 10px, font 13px). Applied alongside any variant

---

## States

**Required States:**
- default — Normal appearance
- hover — Darker background shade (not when disabled)
- disabled — opacity 0.5, cursor not-allowed

**Optional States:**
- N/A

**State Descriptions:**

**Primary Default:** bg `--color-primary` (#2563eb), color white
**Primary Hover:** bg `--color-primary-hover` (#1d4ed8)
**Secondary Default:** bg white, border `--color-border`, color `--color-text`
**Secondary Hover:** bg #f0f0f0
**Danger Default:** bg `--color-danger` (#dc2626), color white
**Danger Hover:** bg #b91c1c
**Disabled:** opacity 0.5, cursor not-allowed (all variants)

---

## Styling

### Design Tokens

```yaml
colors:
  primary-bg: '#2563eb'
  primary-hover: '#1d4ed8'
  danger-bg: '#dc2626'
  danger-hover: '#b91c1c'
  secondary-bg: '#ffffff'
  secondary-hover: '#f0f0f0'
  secondary-border: '#e0e0e0'
  text-light: '#ffffff'
  text-dark: '#1a1a1a'

typography:
  default-size: 14px
  sm-size: 13px
  weight: 500

spacing:
  default-padding: '8px 16px'
  sm-padding: '4px 10px'

effects:
  border-radius: var(--radius) '8px'
  transition: 'background 0.15s'
```

---

## Behavior

**Click:** Triggers associated action handler
**Disabled:** No click handler fires, cursor shows not-allowed
**Keyboard:** Enter/Space triggers click on focused button

---

## Accessibility

**ARIA Attributes:**
- Native `<button>` element (implicit role=button)
- `disabled` attribute when inactive

**Keyboard Support:**
- Tab: Focus
- Enter/Space: Activate

---

## Used In

**Pages:** All 16 pages

**Usage Count:** 80+ instances

**Examples:**
- LoginPage - "Sign In" primary button
- RoomBoardPage - "Check In", "Create Room" buttons
- ActiveSessionPage - "Add Item", "Close Bill" buttons
- BillClosePage - "Complete Payment" primary, "Back" secondary
- MenuDetailPage - "Save" primary, "Cancel" secondary
- RoomDetailPage - "Delete Room" danger

---

## Related Components

- Language Toggle Group — Specialized button group for EN/VI

---

## Version History

**Created:** 2026-06-05
**Last Updated:** 2026-06-05

**Changes:**
- 2026-06-05: Extracted from index.css button styles and all page usages
