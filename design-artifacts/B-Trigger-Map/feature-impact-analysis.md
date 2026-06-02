# Feature Impact Analysis: kmanager

**Date:** 2026-06-02
**Methodology:** Frequency × Intensity × Fit (1-5 each, max 15)

---

## Scoring Summary by Persona

### Minh — Cashier / Front Desk

| ID | Driving Force | Freq | Int | Fit | Score | Priority |
|----|--------------|------|-----|-----|-------|----------|
| D1 | Close bills fast & accurately | 5 | 5 | 4 | 14 | HIGH |
| D2 | Switch between rooms instantly | 5 | 5 | 4 | 14 | HIGH |
| D3 | Fear of billing errors → customer anger | 5 | 5 | 5 | 15 | HIGH |
| D4 | Peak hour stress & overwhelm | 4 | 5 | 4 | 13 | MEDIUM |

### Mr. Hùng — Venue Manager / Owner

| ID | Driving Force | Freq | Int | Fit | Score | Priority |
|----|--------------|------|-----|-----|-------|----------|
| D5 | Real-time revenue dashboard | 5 | 5 | 5 | 15 | HIGH |
| D6 | Scale to new branches seamlessly | 3 | 5 | 4 | 12 | MEDIUM |
| D7 | Fear of revenue leakage | 5 | 5 | 5 | 15 | HIGH |
| D8 | Fast end-of-day reconciliation | 5 | 4 | 5 | 14 | HIGH |

### Thảo — Floor Staff / Waiter

| ID | Driving Force | Freq | Int | Fit | Score | Priority |
|----|--------------|------|-----|-----|-------|----------|
| D9 | At-table order taking (no running) | 5 | 5 | 4 | 14 | HIGH |
| D10 | Room availability at a glance | 4 | 4 | 5 | 13 | MEDIUM |
| D11 | Fear of wrong orders → complaints | 5 | 5 | 5 | 15 | HIGH |
| D12 | Embarrassment from double-charging | 3 | 4 | 4 | 11 | MEDIUM |

### Chef Nam — Kitchen / Bar

| ID | Driving Force | Freq | Int | Fit | Score | Priority |
|----|--------------|------|-----|-----|-------|----------|
| D13 | Real-time order display (glanceable) | 5 | 5 | 5 | 15 | HIGH |
| D14 | One-tap mark as prepared/sold out | 4 | 3 | 5 | 12 | MEDIUM |
| D15 | Clear room identification on orders | 5 | 5 | 4 | 14 | HIGH |
| D16 | No missed or delayed orders | 4 | 5 | 5 | 14 | HIGH |

---

## Distribution

| Priority | Count | % |
|----------|-------|---|
| HIGH (14-15) | 11 | 68.75% |
| MEDIUM (11-13) | 5 | 31.25% |
| LOW (8-10) | 0 | 0% |

**Analysis:** The heavy concentration in HIGH priority confirms that kmanager addresses deeply felt, urgent needs across all four user groups. No driving forces scored below 11, indicating strong product-market fit potential.

---

## Strategic Recommendations

1. **Design around fears first.** Negative drivers (D3, D7, D11, D15, D16) score highest. Eliminating sources of anxiety creates trust faster than adding convenience features.
2. **Dashboard is the owner's anchor.** D5 (15/15) and D8 (14/15) mean the revenue dashboard and reconciliation flow are make-or-break for adoption.
3. **Kitchen display is a visual design challenge, not a feature challenge.** D13 (15/15) depends on typography, contrast, and layout — not complex logic.
4. **Floor staff need mobile-first.** D9 and D11 require tablet/phone optimized interfaces, not desktop forms scaled down.
5. **Multi-branch scaling (D6) can be deferred to post-MVP.** It scored MEDIUM at 12/15 because frequency is low until the second branch actually opens.
