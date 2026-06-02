# 02: Linh's Venue Setup

**Project:** kmanager
**Created:** 2026-06-02
**Method:** Whiteport Design Studio (WDS)
**Design Intent:** Dream Up
**Design Status:** not-started

---

## Transaction (Q1)

**What this scenario covers:**
Set up and maintain the venue's menu items and room configurations — the master data that powers everything in the billing workflow. Without accurate menus and room rates, billing is broken before it starts.

---

## Business Goal (Q2)

**Goal:** Operate More Efficiently
**Objective:** New staff productive within their first shift (Obj 3.2); system works without training or external consultants

---

## User & Situation (Q3)

**Persona:** Linh (Primary — Venue Manager, sole operator per venue)
**Situation:** It's Tuesday afternoon, the venue is quiet. Linh is doing prep work before the evening shift. The owner just added 5 new dishes to the menu and adjusted the VIP room rate. Linh needs to update the system so tonight's billing reflects the correct prices.

---

## Driving Forces (Q4)

**Hope:** Enter menu items and room info once and trust that billing picks up the right prices automatically — zero chance of charging an old rate. Organized categories make finding items fast during peak hour.

**Worry:** Forgetting to update a price or misspelling a code, leading to billing errors tonight. A wrong room rate means either undercharging (owner loses money) or overcharging (angry customer).

---

## Device & Starting Point (Q5 + Q6)

**Device:** Desktop (same terminal as billing workflow)
**Entry:** Linh clicks "Menu" or "Rooms" in the main navigation from the Room Status Board. She's doing admin work during downtime.

---

## Best Outcome (Q7)

**User Success:**
Menu and rooms are always accurate. Adding a new item takes under 30 seconds. Room rates are updated in one place and immediately reflected in active sessions and new check-ins. No billing errors trace back to stale menu data.

**Business Success:**
Zero billing disputes caused by incorrect menu prices or room rates. Venue can change pricing dynamically (e.g., weekend specials, new dishes) without risking errors. Setup is fast enough that seasonal menu changes don't cause downtime.

---

## Shortest Path (Q8)

1. **Menu Item List** — Browse/search all items by category, see prices at a glance, identify what needs updating
2. **Menu Item Detail/Edit** — Add new item or edit existing: name, code, price, category, notes, image. Save and return to list ✓
3. **Room Detail** — View/edit room info: name, type, area, hourly rate, status, notes ✓

---

## Trigger Map Connections

**Persona:** Linh (Primary — Venue Manager)
**Driving Forces Addressed:**
- ✅ **Want:** Switch between rooms instantly and see live status (D2, 14/15 HIGH)
- ❌ **Fear:** Billing errors — stale menu prices or room rates are a root cause (connects to D3, 15/15 HIGH)

**Business Goal:** Operate More Efficiently (Obj 3.2, 3.3)

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 02.1 | `02.1-menu-item-list/` | Browse and search all menu items, organized by category | Click an item → Menu Item Detail/Edit, or Add New → blank detail form |
| 02.2 | `02.2-menu-item-detail/` | Add or edit an item with all fields (name, code, price, category, notes, image) | Save → return to Menu Item List |
| 02.3 | `02.3-room-detail/` | View/edit room configuration (name, type, area, hourly rate, status) | Save → return to Room Status Board |
