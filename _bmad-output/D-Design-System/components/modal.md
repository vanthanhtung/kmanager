# Modal [mdl-001]

**Type:** Feedback
**Category:** Overlay
**Purpose:** Overlay dialog for focused tasks — create rooms, confirm deletions, edit forms

---

## Overview

Full-screen overlay (rgba(0,0,0,0.4)) with centered white content box. 600px max-width, 90% width on small screens, 80vh max height with scroll. Used for CRUD modals across the app.

---

## Variants

No variants — single implementation with variable content.

---

## States

**Required States:**
- open — Overlay visible, content centered
- closed — Fully removed from DOM

---

## Styling

### Design Tokens

```yaml
colors:
  overlay-bg: 'rgba(0,0,0,0.4)'
  content-bg: '#ffffff'

typography:
  (content-defined)

spacing:
  content-padding: 24px

effects:
  content-radius: 12px
  content-shadow: '0 4px 24px rgba(0,0,0,0.15)'

layout:
  max-width: 600px
  width: 90%
  max-height: 80vh
  z-index: 100
```

---

## Sub-Elements

- **Container** (`modal-overlay`) — Fixed position, inset 0, flex center, z-index 100
- **Content** (`modal-content`) — White box, 24px padding, scrollable

---

## Behavior

**Open:** Overlay appears, focus trapped inside modal
**Close:** Click outside or close button dismisses
**Scroll:** Content scrolls internally when exceeds 80vh

---

## Accessibility

**ARIA Attributes:**
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby` for title

**Keyboard Support:**
- Escape: Close modal
- Tab: Trap focus within modal

---

## Used In

**Pages:** 5 pages

**Usage Count:** 5 instances

**Examples:**
- RoomBoardPage — Create Room modal
- RoomBoardPage — Check-in confirmation
- VenueManagementPage — Create/Edit Venue modal (inline page variant)
- RoomDetailPage — Delete confirmation pattern

---

## Version History

**Created:** 2026-06-05
**Last Updated:** 2026-06-05

**Changes:**
- 2026-06-05: Extracted from index.css .modal-overlay and .modal-content
