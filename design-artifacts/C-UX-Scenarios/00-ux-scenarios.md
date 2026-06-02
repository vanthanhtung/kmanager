# UX Scenarios: kmanager

> Scenario outlines connecting Trigger Map personas to concrete user journeys

**Created:** 2026-06-02
**Author:** Tungvan with Saga
**Method:** Whiteport Design Studio (WDS)

---

## Scenario Summary

| ID | Scenario | Persona | Pages | Priority | Status |
|----|----------|---------|-------|----------|--------|
| 01 | Linh's Full Billing Workflow | Linh (Venue Manager) | 6 | ⭐ P1 | ✅ Outlined |
| 02 | Linh's Venue Setup | Linh (Venue Manager) | 3 | P2 | ✅ Outlined |
| 03 | Tùng's Venue Administration | Tùng (Super Admin) | 2 | P2 | ✅ Outlined |

---

## Scenarios

### [01: Linh's Full Billing Workflow](01-linh-billing-workflow/01-linh-billing-workflow.md)
**Persona:** Linh — Close bills fast & accurately, fear of billing errors (D1, D3)
**Pages:** Login, Room Status Board, Room Check-in, Active Room / Session View, Bill Close / Checkout, Revenue Dashboard
**User Value:** Zero manual math, confidence bills are correct, one person runs the entire shift from one terminal
**Business Value:** Full revenue captured per session, zero leakage, accurate billing, faster room turnover, real-time visibility

---

### [02: Linh's Venue Setup](02-linh-venue-setup/02-linh-venue-setup.md)
**Persona:** Linh — Organized menu, fear of stale prices causing billing errors
**Pages:** Menu Item List, Menu Item Detail/Edit, Room Detail
**User Value:** Menu items and room rates always accurate — billing picks up correct prices automatically
**Business Value:** Zero disputes from stale data, pricing changes reflected instantly, venue data always consistent

---

### [03: Tùng's Venue Administration](03-tung-venue-admin/03-tung-venue-admin.md)
**Persona:** Tùng — Scale to new branches, fear of misconfigured venues
**Pages:** Venue List, Venue Management
**User Value:** Create new venue + manager account in under 2 minutes — one form, one click
**Business Value:** Platform scales from 1 to N venues without multiplying admin work, growth not bottlenecked by setup

---

## Page Coverage Matrix

| Page | Scenario | Purpose in Flow |
|------|----------|----------------|
| Login | 01 | Authenticate venue manager, land on Room Status Board |
| Room Status Board | 01 | Live grid of all rooms — status, running costs, quick actions |
| Room Check-in | 01 | Register customer, assign room, start billing session |
| Active Room / Session View | 01 | Add items, see running bill, switch between active rooms |
| Bill Close / Checkout | 01 | Review auto-calculated bill, take payment, close session |
| Revenue Dashboard | 01 | Real-time revenue, utilization, end-of-day reconciliation |
| Menu Item List | 02 | Browse/search all menu items by category |
| Menu Item Detail/Edit | 02 | Add/edit item: name (EN+VI), code, price, category, image |
| Room Detail | 02 | Edit room config: name, type, area, hourly rate, status |
| Venue List | 03 | View all venues, filter by status, see activity metrics |
| Venue Management | 03 | Create/edit/delete venue and its manager account |

**Coverage:** 11/11 pages assigned ✅

---

## Cross-cutting Requirements

- 🌐 **i18n** — Language toggle (English / Tiếng Việt) on all pages
- 🔐 **Single account per venue** — Login determines venue scope, no role-switching
- 🖥️ **Desktop-optimized** — All views designed for 1920×1080, keyboard shortcuts for power users
- ⚡ **Real-time updates** — Room status, running costs, and item additions reflected immediately

---

## Next Phase

These scenario outlines feed into **Phase 4: UX Design** where each page gets:
- Detailed page specifications
- Wireframe sketches
- Component definitions
- Interaction details

---

_Generated with Whiteport Design Studio framework_
