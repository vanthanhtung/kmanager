# scope
- Exclude kitchen/chef persona and kitchen display — food/drink items are added directly by cashier at bill generation time, no separate kitchen order flow. Confidence: 0.85

# architecture
- Per-venue single account model: each venue has exactly one account with unified access to manage everything in that venue. Super admin account can create, edit, and delete venue manager accounts. Confidence: 0.85

# i18n
- All pages must support i18n with language switching between English and Tiếng Việt (Vietnamese). Confidence: 0.85
- For entity nameEn/nameVi fields: use `const isVi = i18n.language.startsWith('vi')` and create `getName()` / `getCatName()` helpers with fallback logic (`nameVi || nameEn`) for display and search filtering. Confidence: 0.70

# ui
- Room cards should have a dedicated Edit button for navigating to room detail, not make the entire card clickable. Confidence: 0.65
- For OCCUPIED rooms, the action button should say "View Room"/"Xem phòng" instead of "Start Session"/"Bắt đầu". Confidence: 0.65
- Backend validation errors (e.g., @Size, @NotBlank) should be surfaced as user-friendly messages in the frontend, not hidden behind generic "Request failed" errors. Confidence: 0.70
- Use inline red text below form fields for validation errors instead of toast/popup notifications. Confidence: 0.70
- Hide native number input spinner arrows (increment/decrement buttons) on price/quantity input fields. Confidence: 0.70
