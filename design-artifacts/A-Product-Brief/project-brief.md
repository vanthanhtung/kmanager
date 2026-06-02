# Project Brief: kmanager

**Date:** 2026-06-02
**Brief Level:** Simplified
**Prepared by:** Tungvan

---

## Scope

A web-based management system for karaoke venues and restaurants with three core modules:

- **Menu Management** — browse, search, add, edit, and remove items with details including name, code, price, notes, and images
- **Room Management** — view and update room information including status, type, rate, area, and notes
- **Cashier Operations** — generate bills per room, record check-in/out times and customer details, automatically calculate charges based on room rental duration plus ordered items

**Tech Stack:** Java 21 + Spring Boot (backend), PostgreSQL (database), ReactJS (frontend)

---

## Challenge / Opportunity

Karaoke venues and restaurants often rely on fragmented or manual processes to manage menus, rooms, and billing. This leads to inefficiency, errors, and poor customer experience. The opportunity is to digitize and streamline operations, ensuring accurate billing, faster service, and better resource management.

---

## Design Goals

- **Reliable** — stable backend with accurate billing logic
- **User-friendly** — intuitive interface for staff with minimal training required
- **Scalable** — able to support multiple branches or venues in the future
- **Integrated** — smooth flow between menu management, room tracking, and cashier functions

---

## Constraints

- Must use Java 21, Spring Boot, PostgreSQL, and ReactJS
- Must handle real-time updates (room status changes, ongoing billing)
- Must run efficiently on standard hardware used in small-to-medium businesses
