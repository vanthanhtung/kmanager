# Design Log: kmanager

**Project:** kmanager
**Created:** 2026-06-02
**Method:** Whiteport Design Studio (WDS)

---

## Progress

### 2026-06-02 — Phase 1: Product Brief Complete

**Agent:** Saga (Analyst)
**Brief Level:** Simplified

**Artifacts Created:**
- `A-Product-Brief/project-brief.md` — Simplified product brief covering scope, challenge, design goals, and constraints

**Summary:** Captured essential project context: karaoke/restaurant management system with menu CRUD, room tracking, and cashier billing. Java 21 + Spring Boot + PostgreSQL + ReactJS stack. Single-account per venue model with super admin oversight. i18n requirement (English / Tiếng Việt).

**Next:** Phase 2 — Trigger Mapping

---

### 2026-06-02 — Phase 2: Trigger Mapping Complete

**Agent:** Saga (Analyst)
**Mode:** Dream (autonomous generation)

**Artifacts Created:**
- `B-Trigger-Map/trigger-map.md` — Master trigger map with Mermaid diagram, 3 business goals, 4 detailed personas, 16 driving forces
- `B-Trigger-Map/feature-impact-analysis.md` — F×I×Fit scoring table, distribution analysis
- `B-Trigger-Map/personas/minh-cashier.md` — Minh the Cashier persona
- `B-Trigger-Map/personas/hung-owner.md` — Mr. Hùng the Owner persona
- `B-Trigger-Map/personas/thao-floor-staff.md` — Thảo the Floor Staff persona
- `B-Trigger-Map/personas/nam-chef.md` — Chef Nam persona

**Summary:** Identified 16 driving forces with 68.75% scoring HIGH priority. Negative forces (fears) dominated — error anxiety is the primary psychological driver. Later revised during Phase 3: kitchen and floor staff personas removed; system consolidated to single venue manager role per venue.

**Next:** Phase 3 — UX Scenarios

---

### 2026-06-02 — Phase 3: UX Scenarios Complete

**Agent:** Saga (Scenario Outline)
**Scenarios:** 3 scenarios covering 11 pages
**Quality:** Excellent (all three 7/7/7/4)

**Artifacts Created:**
- `C-UX-Scenarios/00-ux-scenarios.md` — Scenario index with coverage matrix
- `C-UX-Scenarios/01-linh-billing-workflow/01-linh-billing-workflow.md` — Scenario 01: Linh's Full Billing Workflow
- `C-UX-Scenarios/01-linh-billing-workflow/01.1-login/01.1-login.md` — Login page spec
- `C-UX-Scenarios/01-linh-billing-workflow/01.2-room-status-board/01.2-room-status-board.md` — Room Status Board page spec
- `C-UX-Scenarios/01-linh-billing-workflow/01.3-room-checkin/01.3-room-checkin.md` — Room Check-in page spec
- `C-UX-Scenarios/01-linh-billing-workflow/01.4-active-room-session/01.4-active-room-session.md` — Active Room Session page spec
- `C-UX-Scenarios/01-linh-billing-workflow/01.5-bill-close-checkout/01.5-bill-close-checkout.md` — Bill Close / Checkout page spec
- `C-UX-Scenarios/01-linh-billing-workflow/01.6-revenue-dashboard/01.6-revenue-dashboard.md` — Revenue Dashboard page spec
- `C-UX-Scenarios/02-linh-venue-setup/02-linh-venue-setup.md` — Scenario 02: Linh's Venue Setup
- `C-UX-Scenarios/02-linh-venue-setup/02.1-menu-item-list/02.1-menu-item-list.md` — Menu Item List page spec
- `C-UX-Scenarios/02-linh-venue-setup/02.2-menu-item-detail/02.2-menu-item-detail.md` — Menu Item Detail/Edit page spec
- `C-UX-Scenarios/02-linh-venue-setup/02.3-room-detail/02.3-room-detail.md` — Room Detail page spec
- `C-UX-Scenarios/03-tung-venue-admin/03-tung-venue-admin.md` — Scenario 03: Tùng's Venue Administration
- `C-UX-Scenarios/03-tung-venue-admin/03.1-venue-list/03.1-venue-list.md` — Venue List page spec
- `C-UX-Scenarios/03-tung-venue-admin/03.2-venue-management/03.2-venue-management.md` — Venue Management page spec

**Summary:** Created 3 scenarios covering the full system: Linh's end-to-end billing workflow (Login → Room Status Board → Check-in → Active Session → Bill Close → Dashboard), Linh's venue setup (menu and room configuration), and Tùng's super admin venue management. Added i18n (English/Tiếng Việt) as a cross-cutting requirement on all pages.

**Next:** Phase 4 — UX Design

---

### 2026-06-02 — Phase 4: UX Design Complete (Dream Up)

**Agent:** Freya (UX Designer)
**Mode:** Dream Up (autonomous generation, 11 pages)
**Quality:** All pages designed with full component specs, i18n, states, keyboard shortcuts, and ASCII layouts

**Artifacts Created:**
- `C-UX-Scenarios/01-linh-billing-workflow/01.1-login/01.1-login.md` — Login page spec (full)
- `C-UX-Scenarios/01-linh-billing-workflow/01.2-room-status-board/01.2-room-status-board.md` — Room Status Board page spec (full)
- `C-UX-Scenarios/01-linh-billing-workflow/01.3-room-checkin/01.3-room-checkin.md` — Room Check-in page spec (full)
- `C-UX-Scenarios/01-linh-billing-workflow/01.4-active-room-session/01.4-active-room-session.md` — Active Room Session page spec (full)
- `C-UX-Scenarios/01-linh-billing-workflow/01.5-bill-close-checkout/01.5-bill-close-checkout.md` — Bill Close / Checkout page spec (full)
- `C-UX-Scenarios/01-linh-billing-workflow/01.6-revenue-dashboard/01.6-revenue-dashboard.md` — Revenue Dashboard page spec (full)
- `C-UX-Scenarios/02-linh-venue-setup/02.1-menu-item-list/02.1-menu-item-list.md` — Menu Item List page spec (full)
- `C-UX-Scenarios/02-linh-venue-setup/02.2-menu-item-detail/02.2-menu-item-detail.md` — Menu Item Detail/Edit page spec (full)
- `C-UX-Scenarios/02-linh-venue-setup/02.3-room-detail/02.3-room-detail.md` — Room Detail page spec (full)
- `C-UX-Scenarios/03-tung-venue-admin/03.1-venue-list/03.1-venue-list.md` — Venue List page spec (full)
- `C-UX-Scenarios/03-tung-venue-admin/03.2-venue-management/03.2-venue-management.md` — Venue Management page spec (full)

**Summary:** Completed Dream Up design for all 11 pages across 3 scenarios. Each spec includes: full layout structure (ASCII diagrams), component breakdown with Object IDs, EN/VI i18n content for every element, page states (default/loading/empty/error/success), keyboard shortcuts, and technical implementation notes. Shared patterns emerged: top nav bar, room cards, data tables, search-and-add flows, and i18n toggle. All pages designed for 1920×1080 desktop with keyboard+mouse interaction.

**Design Loop Status:**

| Scenario | Page | Status |
|----------|------|--------|
| 01-linh-billing-workflow | 01.1 | Login | specified | 2026-06-02 |
| 01-linh-billing-workflow | 01.2 | Room Status Board | specified | 2026-06-02 |
| 01-linh-billing-workflow | 01.3 | Room Check-in | specified | 2026-06-02 |
| 01-linh-billing-workflow | 01.4 | Active Room Session | specified | 2026-06-02 |
| 01-linh-billing-workflow | 01.5 | Bill Close / Checkout | specified | 2026-06-02 |
| 01-linh-billing-workflow | 01.6 | Revenue Dashboard | specified | 2026-06-02 |
| 02-linh-venue-setup | 02.1 | Menu Item List | specified | 2026-06-02 |
| 02-linh-venue-setup | 02.2 | Menu Item Detail/Edit | specified | 2026-06-02 |
| 02-linh-venue-setup | 02.3 | Room Detail | specified | 2026-06-02 |
| 03-tung-venue-admin | 03.1 | Venue List | specified | 2026-06-02 |
| 03-tung-venue-admin | 03.2 | Venue Management | specified | 2026-06-02 |

**Next:** Development (Phase 5: Agentic Development) or Design System extraction

---

## Key Decisions

| Date | Decision | Phase | By |
|------|----------|-------|-----|
| 2026-06-02 | Simplified brief level chosen — quick path to capture essentials | Phase 1: Brief | Saga + Tungvan |
| 2026-06-02 | Dream mode for Trigger Map generation — autonomous with final review | Phase 2: Triggers | Saga + Tungvan |
| 2026-06-02 | Removed kitchen/bar and floor staff personas — all food/drink items added by cashier at bill time | Phase 3: Scenarios | Tungvan |
| 2026-06-02 | Single account per venue, one person does everything; super admin manages venue accounts | Phase 3: Scenarios | Tungvan |
| 2026-06-02 | i18n required on all pages: English / Tiếng Việt language toggle | Phase 3: Scenarios | Tungvan |
| 2026-06-02 | Scenarios consolidated to 3: Billing Workflow, Venue Setup, Super Admin — kitchen display/floor mobile removed | Phase 3: Scenarios | Saga + Tungvan |
