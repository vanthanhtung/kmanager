# 03: Tùng's Venue Administration

**Project:** kmanager
**Created:** 2026-06-02
**Method:** Whiteport Design Studio (WDS)
**Design Intent:** Dream Up
**Design Status:** not-started

---

## Transaction (Q1)

**What this scenario covers:**
As super admin, manage all karaoke venue accounts — create a new venue (with a single manager account), edit venue details, or disable/delete a venue that's no longer operating.

---

## Business Goal (Q2)

**Goal:** Operate More Efficiently + Become More Profitable
**Objective:** Open at least 1 new branch within 18 months (Obj 1.3); reduce admin time by 50% (Obj 3.1)

---

## User & Situation (Q3)

**Persona:** Tùng (Super Admin — you, the system owner)
**Situation:** A new venue owner has signed up to use kmanager. Tùng needs to create their venue and manager account so they can log in and start setting up their menu and rooms. Everything the venue manager does after this is captured in Scenarios 01 and 02.

---

## Driving Forces (Q4)

**Hope:** Create a new venue and hand over the keys in under 2 minutes — one form, one account, one login. Growing the platform should feel like flipping a switch, not filling out paperwork.

**Worry:** A misconfigured venue account causing confusion (wrong name, missing permissions, manager can't log in). Losing track of which venues are active vs. inactive as the platform grows.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Desktop (laptop or desktop — same interface, responsive)
**Entry:** Tùng navigates to the super admin URL, logs in with his super admin credentials, and sees the Venue List.

---

## Best Outcome (Q7)

**User Success:**
Tùng can create, edit, and disable venues from one screen. A new venue is operational in 2 minutes. At a glance, he sees every venue on the platform — which are active, when they were last used, and how many rooms/menus they have.

**Business Success:**
Platform scales from 1 to N venues without multiplying admin work. Venue creation is self-service enough that growth isn't bottlenecked by Tùng's time. Inactive venues can be archived without data loss.

---

## Shortest Path (Q8)

1. **Venue List** — See all venues with status, last activity, quick metrics. Identify where action is needed ✓
2. **Venue Management** — Create/edit/delete a venue: name, address, manager account (username + password), status ✓

---

## Trigger Map Connections

**Persona:** Tùng (Super Admin)
**Driving Forces Addressed:**
- ✅ **Want:** Scale to new branches without tripling admin work (D6, 12/15 MEDIUM)
- ❌ **Fear:** Revenue leakage — misconfigured venues could lose data or bill incorrectly (connects to D7, 15/15 HIGH)

**Business Goal:** Become More Profitable (Obj 1.3) + Operate More Efficiently (Obj 3.1)

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 03.1 | `03.1-venue-list/` | See all venues, filter by status, identify which need attention | Click a venue → Venue Management (edit), or "Add Venue" → blank form |
| 03.2 | `03.2-venue-management/` | Create or edit a venue: name, address, manager credentials, status | Save → return to Venue List |
