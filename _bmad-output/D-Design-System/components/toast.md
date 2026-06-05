# Toast Notification [alt-001]

**Type:** Feedback
**Category:** Notification
**Purpose:** Temporary success/error notification sliding in from top-right

---

## Overview

Fixed-position toast appearing at top-right (top: 16px, right: 16px). Slides in with animation from right edge. 12px 20px padding, 14px font, white text. Two variants: success (green) and error (red). Z-index 200.

---

## Variants

- **success** — Green background (`--color-success` #16a34a)
- **error** — Red background (`--color-danger` #dc2626)

---

## States

**Required States:**
- entering — Slide-in animation 300ms ease
- visible — Displayed at top-right
- exiting — Auto-dismiss or manual close

---

## Styling

### Design Tokens

```yaml
colors:
  success-bg: color-success '#16a34a'
  error-bg: color-danger '#dc2626'
  text: '#ffffff'

typography:
  size: 14px

spacing:
  padding: '12px 20px'
  position: 'top 16px, right 16px'

effects:
  border-radius: var(--radius) '8px'
  animation: 'slideIn 0.3s ease'
  z-index: 200
```

---

## Animation

```css
@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
```

---

## Behavior

**Appear:** Slide in from right edge
**Dismiss:** Auto-hide after timeout or manual close
**Stack:** Multiple toasts should stack vertically

---

## Used In

**Pages:** All pages (global utility)

**Usage Count:** 15+ instances

---

## Version History

**Created:** 2026-06-05
