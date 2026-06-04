# Test Automation Summary

**Project:** kmanager  
**Framework:** Playwright 1.60  
**Generated:** 2026-06-04

## Generated Tests

| File | Tests | Flow |
|------|-------|------|
| `tests/e2e/login.spec.ts` | 4 | Login (SUPER_ADMIN, VENUE_MANAGER, invalid creds, language toggle) |
| `tests/e2e/room-board.spec.ts` | 7 | Room board, status filter, search, create modal, edit nav, check-in, occupied view |
| `tests/e2e/menu.spec.ts` | 5 | Menu list, add item, create item, edit item, language toggle |
| `tests/e2e/billing.spec.ts` | 5 | Active session, bill list, bill detail, room charge row, print button |
| `tests/e2e/manual-bill.spec.ts` | 5 | Manual bill nav, form fields, add item, remove item, auto-fill tender |
| `tests/e2e/dashboard.spec.ts` | 6 | KPI cards, revenue breakdown, brand nav, nav links, bills link, language persist |
| `tests/e2e/venue-admin.spec.ts` | 5 | Venue list, hotline/wifi fields, edit venue, toggle status, create venue, password validation |
| **Total** | **37** | **8 flows covered** |

## Coverage

- **Auth:** Login flow, role-based redirect, error handling, language switch
- **Room:** Board display, status filtering, search, check-in flow, occupied state
- **Menu:** CRUD operations, i18n display
- **Billing:** Session view, bill list, bill detail, room charge rendering, print
- **Manual Bill:** Full creation flow, item add/remove, auto-fill tendered amount
- **Dashboard:** KPI display, revenue breakdown, navigation
- **Venue Admin:** CRUD, hotline/wifi fields, password validation inline errors

## How to Run

```bash
# Install browsers first
npx playwright install chromium

# Run all tests (requires backend running on localhost:8080)
cd frontend && npm test

# Run tests with visible browser
npm run test:headed

# Run a specific test file
npx playwright test tests/e2e/login.spec.ts
```

## Prerequisites

- Backend running on `localhost:8080`
- PostgreSQL `kmanager` database with venues, rooms, and menu items seeded
- Test accounts: `admin` (SUPER_ADMIN), `manager1` (VENUE_MANAGER)

## Next Steps

- Run tests and fix any failures
- Add more edge case tests as features evolve
- Integrate into CI/CD pipeline
