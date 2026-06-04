# scope
- Exclude kitchen/chef persona and kitchen display — food/drink items are added directly by cashier at bill generation time, no separate kitchen order flow. Confidence: 0.85

# architecture
- Per-venue single account model: each venue has exactly one account with unified access to manage everything in that venue. Super admin account can create, edit, and delete venue manager accounts. Confidence: 0.85

# i18n
- All pages must support i18n with language switching between English and Tiếng Việt (Vietnamese). Confidence: 0.85
- For entity nameEn/nameVi fields: use `const isVi = i18n.language.startsWith('vi')` and create `getName()` / `getCatName()` helpers with fallback logic (`nameVi || nameEn`) for display and search filtering. Confidence: 0.70

# ui
See [ui/taste.md](ui/taste.md)
