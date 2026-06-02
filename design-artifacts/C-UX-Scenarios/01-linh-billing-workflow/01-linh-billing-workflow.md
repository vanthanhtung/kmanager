# 01: Linh's Full Billing Workflow

**Project:** kmanager
**Created:** 2026-06-02
**Method:** Whiteport Design Studio (WDS)
**Design Intent:** Dream Up
**Design Status:** not-started

---

## Transaction (Q1)

**What this scenario covers:**
Check in a customer, add food/drink items during their karaoke session, auto-calculate the final bill (room time × hourly rate + ordered items), close the bill, collect payment — all by one person on one terminal.

---

## Business Goal (Q2)

**Goal:** Become More Profitable + Deliver Error-Free Service
**Objective:** Maintain 20%+ profit margin through accurate billing and reduced leakage (Obj 1.1); keep billing disputes under 10/month (Obj 2.1); room check-in/out under 3 minutes (Obj 3.3)

---

## User & Situation (Q3)

**Persona:** Linh (Primary — Venue Manager, sole operator per venue)
**Situation:** Linh runs a karaoke venue alone. It's a Friday night, 8pm — peak hour is building. Three groups are waiting to check in, two rooms just called to order more drinks, and Room 5 is about to finish. She's at the front desk terminal, a 24" monitor in front of her, phone ringing. Everything flows through her.

---

## Driving Forces (Q4)

**Hope:** Close every bill fast and accurately — zero mental math, see exactly which room is where in the session, finish the shift with the till balanced and zero complaints.

**Worry:** Making a billing error and facing an angry customer — has been yelled at before. Losing track during peak hour and double-charging or missing items, which means the owner loses money and she looks incompetent.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Desktop (24" monitor at front desk terminal, keyboard + mouse)
**Entry:** Linh arrives for her evening shift, sits at the front desk terminal, opens kmanager and logs in with her venue credentials. She expects to see the Room Status Board immediately — she needs to know what's happening before the first customer walks up.

---

## Best Outcome (Q7)

**User Success:**
All rooms closed accurately, every bill auto-calculated without mental math, till matches system at end of shift, zero customer disputes, Linh goes home on time feeling competent and in control.

**Business Success:**
Full revenue captured per session — zero leakage from missed items or calculation errors. Room turnover under 3 minutes from checkout to next check-in. Fewer than 10 billing disputes per month. Revenue dashboard shows accurate real-time performance.

---

## Shortest Path (Q8)

1. **Login** — Authenticate with venue credentials, land on Room Status Board
2. **Room Status Board** — See live overview: which rooms are available, occupied, cleaning, or ready to close. Identify the next room to check in
3. **Room Check-in** — Enter customer name and phone, assign a room, session timer starts automatically
4. **Active Room / Session View** — Live billing: add food/drink items during the session, see running total (room time × rate + items), switch between active rooms
5. **Bill Close / Checkout** — Review auto-calculated bill (room duration × hourly rate + all items), apply payment, print/save receipt ✓
6. **Revenue Dashboard** — See updated revenue, room utilization for the shift, verify nothing looks off

---

## Trigger Map Connections

**Persona:** Linh (Primary — Venue Manager)
**Driving Forces Addressed:**
- ✅ **Want:** Close bills fast & accurately — under 30 seconds, no mental math (D1, 14/15 HIGH)
- ✅ **Want:** Switch between rooms instantly and see live status (D2, 14/15 HIGH)
- ❌ **Fear:** Billing errors leading to angry customer confrontations (D3, 15/15 HIGH)
- ❌ **Fear:** Stress and overwhelm during peak hours (D4, 13/15 MEDIUM)

**Business Goal:** Become More Profitable (Obj 1.1, 1.2) + Deliver Error-Free Service (Obj 2.1) + Operate More Efficiently (Obj 3.3)

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 01.1 | `01.1-login/` | Authenticate and enter the system | Successful login → Room Status Board |
| 01.2 | `01.2-room-status-board/` | See live room overview, identify next action | Select a room → Room Check-in or Active Room View |
| 01.3 | `01.3-room-checkin/` | Enter customer details, assign room, start session | Confirm check-in → Active Room / Session View |
| 01.4 | `01.4-active-room-session/` | Manage live session: add items, see running total, switch rooms | Select "Close Bill" → Bill Close / Checkout |
| 01.5 | `01.5-bill-close-checkout/` | Review auto-calculated bill, take payment, finalize | Payment complete → Revenue Dashboard |
| 01.6 | `01.6-revenue-dashboard/` | Verify revenue and utilization after shift | End of shift — logout |

---

## Cross-cutting Requirements

- 🌐 **i18n:** Language toggle (English / Tiếng Việt) visible on all pages
- 🔐 **Single account:** Linh's login determines which venue data she sees — no venue switching needed
- 🖥️ **Desktop-optimized:** Designed for 1920×1080, keyboard shortcuts for power users
- ⚡ **Real-time:** Room status updates, running bill totals, and item additions reflect immediately
