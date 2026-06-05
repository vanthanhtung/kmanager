# Spinner [spn-001]

**Type:** Feedback
**Category:** Loading Indicator
**Purpose:** Circular loading indicator for async operations — data fetching, form submission

---

## Overview

CSS-only spinning circle. 24px diameter, 3px border width. Gray track (#e0e0e0) with blue spinner (`--color-primary`). Centered with 20px auto margin. 600ms infinite rotation.

---

## States

**Required States:**
- visible — Spinning animation active

---

## Styling

### Design Tokens

```yaml
colors:
  track: '#e0e0e0'
  spinner: color-primary '#2563eb'

spacing:
  size: 24px
  border-width: 3px
  margin: '20px auto'

effects:
  border-radius: 50%
  animation: 'spin 0.6s linear infinite'
```

---

## Used In

**Pages:** 10+ pages

**Usage Count:** 15+ instances

**Examples:**
- RoomBoardPage — Loading rooms
- MenuListPage — Loading menu items
- DashboardPage — Loading dashboard data
- All detail pages — Loading individual entity

---

## Version History

**Created:** 2026-06-05
