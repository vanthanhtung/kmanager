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
| 01-linh-billing-workflow | 01.1 | Login | implemented | 2026-06-04 |
| 01-linh-billing-workflow | 01.2 | Room Status Board | implemented | 2026-06-04 |
| 01-linh-billing-workflow | 01.3 | Room Check-in | implemented | 2026-06-04 |
| 01-linh-billing-workflow | 01.4 | Active Room Session | implemented | 2026-06-04 |
| 01-linh-billing-workflow | 01.5 | Bill Close / Checkout | implemented | 2026-06-04 |
| 01-linh-billing-workflow | 01.6 | Revenue Dashboard | implemented | 2026-06-04 |
| 02-linh-venue-setup | 02.1 | Menu Item List | implemented | 2026-06-04 |
| 02-linh-venue-setup | 02.2 | Menu Item Detail/Edit | implemented | 2026-06-04 |
| 02-linh-venue-setup | 02.3 | Room Detail | implemented | 2026-06-04 |
| 03-tung-venue-admin | 03.1 | Venue List | implemented | 2026-06-04 |
| 03-tung-venue-admin | 03.2 | Venue Management | implemented | 2026-06-04 |

**Next:** Development System extraction (Phase 7: Design System)

---

### 2026-06-04 — Phase 5: Agentic Development Complete

**Agent:** Mimir (Builder)
**Method:** `wds-5-agentic-development`

**Summary:** Implemented full-stack karaoke/restaurant management system from UX specs. All 11 page specs implemented plus 5 additional pages. Real-time WebSocket communication, role-based auth (SUPER_ADMIN / VENUE_MANAGER), full i18n (EN/VI), and 37 E2E Playwright tests.

**Backend (41 Java source files):**
- 9 JPA entities: `Bill`, `BillItem`, `MenuCategory`, `MenuItem`, `Room`, `RoomCategory`, `Session`, `Venue`, `VenueManager` — UUID PKs, i18n computed getters
- 4 controllers: `AuthController` (POST /api/auth/login), `AdminController` (venue CRUD), `SessionController` (session lifecycle, billing, manual bills, dashboard), `ResourceController` (rooms, menu items, menu categories CRUD)
- 2 services: `VenueService` (auth, venue CRUD), `SessionService` (399 lines: session lifecycle, billing, manual bills, dashboard, WebSocket notifications)
- 12 DTOs: `LoginRequest/Response`, `CreateVenueRequest`, `VenueResponse`, `CreateSessionRequest`, `SessionResponse`, `AddItemRequest`, `CloseBillRequest`, `BillResponse`, `BillItemResponse`, `ManualBillRequest`, `DashboardResponse`
- 8 JPA repositories
- Security: `SecurityConfig` (stateless JWT, role-based), `JwtAuthFilter`, `JwtUtil` (HS384, 24h expiry)
- WebSocket: `WebSocketController` + `WebSocketConfig` (STOMP/SockJS — real-time room & dashboard updates)
- 7 Flyway migrations: full schema, seed data, schema refinements (removed CLEANING status, nullable FKs, SET NULL on delete)

**Frontend (16 pages + supporting code):**
- All 11 UX-design pages: `LoginPage`, `RoomBoardPage`, `RoomCheckinPage`, `ActiveSessionPage`, `BillClosePage`, `DashboardPage`, `MenuListPage`, `MenuDetailPage`, `RoomDetailPage`, `VenueListPage`, `VenueManagementPage`
- 5 additional pages: `BillDetailPage`, `BillsPage`, `ManualBillPage`
- `AppLayout.tsx` — Top nav bar with role-based links, lang toggle, logout
- `api/client.ts` — Centralized fetch client (auth headers, error handling)
- `store/auth.tsx` — React Context auth provider
- `i18n/` — Full i18n with ~210 keys per language (English / Tiếng Việt)
- `App.tsx` — React Router with 16 routes, `Protected` route guard

**Testing:** 37 Playwright E2E tests across 8 spec files: login, room-board, menu, billing, manual-bill, dashboard, venue-admin

**Key Deviations from UX Specs:**
- Added `BillDetailPage`, `BillsPage`, `ManualBillPage` beyond original 11-page scope
- All component subdirectories under `components/` left empty — UI inlined in page files per project convention
- No backend unit tests — coverage via E2E Playwright only
- No formal story/sprint decomposition in `planning-artifacts/` — developed directly from UX specs

**Next:** Design System extraction (Phase 7) or Asset Generation (Phase 6)

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
| 2026-06-04 | Developed directly from UX specs without formal sprint/story decomposition in planning-artifacts | Phase 5: Dev | Mimir |
| 2026-06-04 | Added 3 extra pages beyond 11 UX specs: BillDetail, Bills list, Manual Bill creation | Phase 5: Dev | Mimir |
| 2026-06-04 | UI inlined in page files (inline `style={{}}`) — no CSS modules or separate component files | Phase 5: Dev | Mimir |
| 2026-06-04 | No backend unit tests — coverage via 37 Playwright E2E tests only | Phase 5: Dev | Mimir |
