# Project Context for kmanager

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Backend:** Java 21, Spring Boot 3.4.1, Maven (compiler plugin 3.14.0)
- **Database:** PostgreSQL 18.3, Flyway (migrations V1–V5), `ddl-auto: validate`
- **JPA:** Hibernate 6.6.4, UUID primary keys, `@JsonIgnore` on lazy-loaded relations
- **Security:** Spring Security, jjwt 0.12.6 (JWT HS384, 24h expiry)
- **API:** REST (Spring MVC), WebSocket (STOMP via SockJS)
- **Frontend:** React 18.3.1, TypeScript 5.6 (strict), Vite 6, plain CSS
- **Routing:** React Router DOM 6.28
- **i18n:** i18next 23.16 + react-i18next 15.1 (English / Tiếng Việt)
- **State:** React Context (`useAuth`), no Redux/Zustand
- **WebSocket Client:** @stomp/stompjs 7.0.0 + sockjs-client 1.6.1
- **Dev Proxy:** Vite proxies `/api` → `localhost:8080`, `/ws` → `localhost:8080` (WS upgrade)

## Critical Implementation Rules

### Language-Specific Rules

**Frontend (TypeScript/React):**
- No comments or JSDoc — code should be self-documenting; comments only when logic is genuinely unobvious
- `any` type is standard for API responses and component props — no strict DTO typing needed
- Use async/await exclusively — no `.then()` chains
- `useRef` to block polling during mutations (e.g., `addingRef` flag prevents `setInterval` from overwriting state during `addItem`)
- Inline `style={{...}}` over CSS modules — all styling is inline JSX objects

**Backend (Java):**
- `@JsonIgnore` + computed getter for lazy-loaded relations — entities must expose `getCategoryId()`, `getCategoryNameEn()`, `getCategoryNameVi()` instead of exposing the relation object
- `@Transactional` required on all service methods that write to DB
- Controllers use raw `Map<String, Object>` for update/create endpoints that need to accept partial JSON (avoids Jackson serializing `@JsonIgnore` fields as null and overwriting DB values)
- `extractVenueId(auth)` in controllers — venue ID comes from JWT credentials stored in `Authentication.getCredentials()`
- All business logic in services — controllers are thin passthroughs
- Flyway migration files must be numbered `V{next}.sql` — `ddl-auto: validate` means no auto-schema changes
- Validation is minimal (`@NotBlank`, `@Size`) — business rules enforced in service layer

### Framework-Specific Rules

**Architecture & Auth:**
- Two roles: `SUPER_ADMIN` (manages all venues, routes to `/admin/venues`) and `VENUE_MANAGER` (manages one venue, routes to `/dashboard`)
- JWT claims include `role` and `venueId`; venue ID extracted from `Authentication.getCredentials()` by controllers
- `SecurityConfig`: `/api/auth/**` permitAll, `/api/admin/**` requires SUPER_ADMIN role, all other endpoints require VENUE_MANAGER
- Login uses `window.location.href` redirect (not React Router navigate) to ensure AuthProvider reloads with fresh localStorage state

**Per-Venue Multi-Tenant Model:**
- Each venue has exactly one VENUE_MANAGER account
- Room, menu item, menu category, session, and bill entities are scoped to venue via `venue_id` FK
- Controllers extract venue ID from auth and pass to service methods — never trust client-provided venue data

**Room/Session Lifecycle:**
- Room status enum: `AVAILABLE`, `OCCUPIED`, `MAINTENANCE`
- Check-in creates an ACTIVE session → room becomes OCCUPIED
- Close bill ends the session → room returns to AVAILABLE
- Manual bills bypass this: create a dummy room (unique `M{timestamp}` number), dummy session, add items, close immediately

**i18n Pattern (All Pages):**
- `const isVi = i18n.language.startsWith('vi')` in every component that renders entity names
- `getName(item)` = `isVi ? (item.nameVi || item.nameEn) : item.nameEn`
- `getCatName(item)` = `isVi ? (item.categoryNameVi || item.categoryNameEn) : item.categoryNameEn`
- Backend entities have `nameEn`/`nameVi` columns and computed getters (`getCategoryNameEn()`, `getCategoryNameVi()`) due to `@JsonIgnore` on the category relation
- All i18n keys in `en.json`/`vi.json` under namespaced sections (`board.*`, `bill.*`, `venue.*`, etc.)
- No hardcoded strings in components — everything goes through `t('key')`

**API Client Conventions:**
- Base path is `/api`, proxied by Vite; JWT token in `Authorization: Bearer` header
- `POST /api/sessions/{id}/close` accepts overrides: `startedAt`, `endedAt`, `hourlyRate`, `discount`
- `POST /api/sessions/bills/manual` creates bills outside the room/session workflow (accepts manual item lines)
- `GET /api/rooms/{roomId}/active-session` resolves an active session from a room ID
- Client `request()` handles: 401 → clear token + redirect to login; 4xx/5xx → throw with server error message; empty 2xx body → return `null` (not crash on `JSON.parse("")`)

### Code Quality & Anti-Patterns

**Must NOT Do:**
- Never add comments to existing code unless the logic is genuinely unintuitive
- Never add docstrings, JSDoc, or explanatory comments to self-explanatory code
- Never change the V1 migration file — Flyway validates checksums; schema changes must be new V{n} migrations
- Never expose lazy-loaded JPA relations directly in JSON — always use `@JsonIgnore` + computed getter
- Never auto-create DB schema — `ddl-auto: validate` is enforced; all changes go through Flyway migrations
- Never hardcode UI strings — everything must be translatable via i18n keys
- Never use `@NotBlank` on fields that are optional in update requests (e.g., `username` in `CreateVenueRequest`)
- Never use `res.json()` without checking for empty response bodies — use `res.text()` then conditionally parse

**Critical Gotchas:**
- `@JsonIgnore` blocks BOTH serialization AND deserialization — if frontend sends `{category: {id: "..."}}`, Jackson ignores it; use `categoryId` string field instead
- React state from `useAuth` is stale immediately after `auth.login()` — use raw API response for redirect decisions, not `auth.role`
- Bill number uniqueness: manual bills use `yyyyMMddHHmmss-M{millis}` format due to count-based numbering race condition
- `BillItem.menu_item_id` is nullable (dropped FK constraint in V5) — manual bill items have `null` menu_item_id
- `closeBill` sets `startedAt`/`endedAt`/`hourlyRate` on the session from request overrides — the bill's calculated values depend on these
- Number input CSS: `-webkit-appearance: none` and `-moz-appearance: textfield` applied globally to hide spinner arrows

### Development Workflow

- Run backend: `cd backend && mvn spring-boot:run` (port 8080, needs PostgreSQL at localhost:5432/kmanager)
- Run frontend: `cd frontend && npm run dev` (port 5173, proxies API to 8080)
- Login as SUPER_ADMIN: `admin` / any password (bypasses DB) → lands on `/admin/venues`
- Login as VENUE_MANAGER: use credentials created via admin panel → lands on `/dashboard`
- TypeScript check: `cd frontend && npx tsc --noEmit`
- Backend compile: `cd backend && mvn compile -q`

---

## Usage Guidelines

**For AI Agents:** Read this file before implementing any code. Follow ALL rules exactly as documented. When in doubt, prefer the more restrictive option. Update this file if new patterns emerge.

**For Humans:** Keep this file lean and focused on agent needs. Update when technology stack changes. Review quarterly for outdated rules. Remove rules that become obvious over time.

Last Updated: 2026-06-04
