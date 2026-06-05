# Language Toggle [tgl-001]

**Type:** Interactive
**Category:** Toggle Control
**Purpose:** Dual-button EN/VI language switcher with active state highlight, embedded in top nav

---

## Overview

Two-button segmented toggle for switching between English and Tiếng Việt. Part of the top nav bar. Active language gets primary blue background with white text. Buttons are connected (no gap, first has left radius, last has right radius).

---

## Variants

No variants — single implementation with EN/VI buttons.

---

## States

**Required States:**
- EN active — Left button highlighted in primary blue
- VI active — Right button highlighted in primary blue

---

## Styling

### Design Tokens

```yaml
colors:
  default-bg: '#ffffff'
  default-text: color-text-secondary '#666666'
  active-bg: color-primary '#2563eb'
  active-text: '#ffffff'
  border: color-border '#e0e0e0'

typography:
  size: 13px

spacing:
  padding: '4px 10px'

effects:
  first-radius: '4px 0 0 4px'
  last-radius: '0 4px 4px 0'
```

---

## Behavior

**Click:** Calls `i18n.changeLanguage(lng)`, persists to localStorage key `lang`
**Active Detection:** `i18n.language.startsWith('vi')` for VI detection

---

## Used In

**Pages:** 14 (embedded in Top Navigation Bar [nav-001])

**Usage Count:** 1 instance (in nav)

---

## Version History

**Created:** 2026-06-05
