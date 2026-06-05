# Top Navigation Bar [nav-001]

**Type:** Navigation
**Category:** Global Navigation
**Purpose:** Top-level navigation bar with brand, role-based links, language toggle, and logout

---

## Overview

The Top Navigation Bar is the primary navigation shell for all authenticated pages. It displays the brand logo, page links filtered by user role (VENUE_MANAGER vs SUPER_ADMIN), an EN/VI language toggle, and a logout button. Fixed height of 56px, spans full width.

---

## Variants

No variants — single implementation with role-based conditional rendering.

Role-based link visibility:
- **VENUE_MANAGER:** Dashboard, Rooms, Menu, Bills
- **SUPER_ADMIN:** Admin (venues)

---

## States

**Required States:**
- default — All nav links visible with active link highlighted
- active — Current route link has `--color-primary` text color + font-weight 600

**Optional States:**
- N/A

**State Descriptions:**

**Default:** White background (`--color-surface`), bottom border (`--color-border`), links in `--color-text`
**Active Link:** Primary blue text (`--color-primary`), semi-bold weight

---

## Styling

### Visual Properties

**Size:** height 56px, padding 0 20px
**Shape:** Rectangular, full-width
**Colors:**
- Background: `--color-surface` (#ffffff)
- Border: `--color-border` (#e0e0e0)
- Brand text: `--color-primary` (#2563eb)
- Link text: `--color-text` (#1a1a1a)
- Active/hover link: `--color-primary` (#2563eb)

**Typography:**
- Brand: 16px, weight 700
- Links: 14px, weight 400 (600 when active)

**Spacing:**
- Gap between links: 12px
- Padding: 0 20px
- Brand flex: 1 (pushes links to right)

### Design Tokens

```yaml
colors:
  background: color-surface
  border-bottom: color-border
  brand: color-primary
  link-default: color-text
  link-active: color-primary
  link-hover: color-primary

typography:
  brand-size: 16px
  brand-weight: 700
  link-size: 14px
  link-active-weight: 600

spacing:
  height: 56px
  padding-x: 20px
  gap: 12px

effects:
  border-bottom: 1px solid color-border
```

---

## Behavior

### Interactions

**NavLink Click:**
Navigates to target route. Active state set automatically via React Router NavLink `isActive`.

**Language Toggle:**
Two buttons (EN/VI) — clicking changes i18n language and persists to localStorage key `lang`. Active language highlighted with primary color background.

**Logout:**
Calls `auth.logout()`, clears token, navigates to `/login`.

**Brand Click:**
Navigates to dashboard (`/dashboard`) for VENUE_MANAGER or admin (`/admin/venues`) for SUPER_ADMIN.

### Keyboard:
- Tab: Moves focus between all interactive elements (links, language buttons, logout)
- Enter: Activates focused link/button

---

## Accessibility

**ARIA Attributes:**
- `<nav>` semantic element

**Keyboard Support:**
- All links and buttons are keyboard-focusable
- Tab order follows visual order

**Screen Reader:**
Nav element announced as navigation landmark. Active link identifiable via `aria-current` (from NavLink).

---

## Usage

### When to Use
- Every authenticated page in the app
- Single top-level navigation element

### When Not to Use
- Login page (no nav bar shown)
- Nested/contextual navigation (use in-page tabs or breadcrumbs)

### Best Practices
- Keep link count manageable (4-5 per role)
- Highlight only the current page, not parent sections
- Brand click always returns to role-appropriate home

---

## Used In

**Pages:** 14 (all authenticated pages)

**Usage Count:** 14

**Examples:**
- RoomBoardPage - Rooms link active
- DashboardPage - Dashboard link active
- MenuListPage - Menu link active
- BillsPage - Bills link active
- VenueListPage - Admin link active

---

## Related Components

- Language Toggle — Embedded as sub-component within nav
- Logout Button [btn-001] — Uses `btn-secondary btn-sm` variant

---

## Version History

**Created:** 2026-06-05
**Last Updated:** 2026-06-05

**Changes:**
- 2026-06-05: Created component from AppLayout.tsx extraction
