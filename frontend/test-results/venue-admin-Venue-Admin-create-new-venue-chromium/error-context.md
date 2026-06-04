# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: venue-admin.spec.ts >> Venue Admin >> create new venue
- Location: tests/e2e/venue-admin.spec.ts:42:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel('Venue Name').or(getByLabel('Tên địa điểm'))

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - navigation [ref=e5]:
    - generic [ref=e6] [cursor=pointer]: 🎤 kmanager
    - link "Quản trị" [ref=e7] [cursor=pointer]:
      - /url: /admin/venues
    - generic [ref=e8]:
      - button "EN" [ref=e9] [cursor=pointer]
      - button "VI" [ref=e10] [cursor=pointer]
    - button "Đăng xuất" [ref=e11] [cursor=pointer]
  - main [ref=e12]:
    - generic [ref=e13]:
      - generic [ref=e14]:
        - button "← Quay lại" [ref=e15] [cursor=pointer]
        - heading "Tạo địa điểm mới" [level=1] [ref=e16]
      - generic [ref=e17]:
        - generic [ref=e18]:
          - generic [ref=e19]: Tên địa điểm *
          - textbox [ref=e20]
        - generic [ref=e21]:
          - generic [ref=e22]: Địa chỉ
          - textbox [ref=e23]
        - generic [ref=e24]:
          - generic [ref=e25]:
            - generic [ref=e26]: Hotline
            - textbox [ref=e27]
          - generic [ref=e28]:
            - generic [ref=e29]: WiFi
            - textbox [ref=e30]
        - generic [ref=e31]:
          - heading "Quản lý" [level=3] [ref=e32]
          - generic [ref=e33]:
            - generic [ref=e34]: Tên đăng nhập *
            - textbox [ref=e35]
          - generic [ref=e36]:
            - generic [ref=e37]:
              - generic [ref=e38]: Mật khẩu *
              - textbox [ref=e39]
            - generic [ref=e40]:
              - generic [ref=e41]: Xác nhận mật khẩu *
              - textbox [ref=e42]
        - generic [ref=e43]:
          - button "Hủy" [ref=e44] [cursor=pointer]
          - button "Lưu" [disabled] [ref=e45]
```

# Test source

```ts
  1  | import { test, expect } from './helpers';
  2  | 
  3  | test.describe('Venue Admin', () => {
  4  |   test.beforeEach(async ({ page, loginAsSuperAdmin }) => {
  5  |     await loginAsSuperAdmin();
  6  |     await page.waitForTimeout(500);
  7  |   });
  8  | 
  9  |   test('venue list shows venues', async ({ page }) => {
  10 |     await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 5000 });
  11 |   });
  12 | 
  13 |   test('create venue form shows hotline and wifi fields', async ({ page }) => {
  14 |     await page.getByText('Add Venue').or(page.getByText('Thêm địa điểm')).click();
  15 |     await page.waitForTimeout(500);
  16 |     expect(page.url()).toMatch(/\/admin\/venues\/new/);
  17 |     await expect(page.getByLabel('Hotline')).toBeVisible();
  18 |     await expect(page.getByLabel('WiFi')).toBeVisible();
  19 |   });
  20 | 
  21 |   test('edit venue shows existing data', async ({ page }) => {
  22 |     // Click the edit button on the first venue
  23 |     const editBtn = page.locator('table tbody tr').first().locator('button:has-text("✏")');
  24 |     if (await editBtn.isVisible()) {
  25 |       await editBtn.click();
  26 |       await page.waitForTimeout(500);
  27 |       expect(page.url()).toMatch(/\/admin\/venues\//);
  28 |       await expect(page.getByLabel('Venue Name').or(page.getByLabel('Tên địa điểm'))).toBeVisible();
  29 |     }
  30 |   });
  31 | 
  32 |   test('venue toggle status works', async ({ page }) => {
  33 |     const toggleBtn = page.locator('table tbody tr').first().locator('button:has-text("⏸"),button:has-text("▶")');
  34 |     if (await toggleBtn.isVisible()) {
  35 |       await toggleBtn.click();
  36 |       await page.waitForTimeout(1000);
  37 |       // Page should reload
  38 |       await expect(page.locator('table tbody tr').first()).toBeVisible();
  39 |     }
  40 |   });
  41 | 
  42 |   test('create new venue', async ({ page }) => {
  43 |     await page.goto('/admin/venues/new');
  44 |     await page.waitForTimeout(500);
  45 |     const ts = Date.now().toString().slice(-4);
> 46 |     await page.getByLabel('Venue Name').or(page.getByLabel('Tên địa điểm')).fill('Test Venue ' + ts);
     |                                                                             ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  47 |     await page.getByLabel('Address').or(page.getByLabel('Địa chỉ')).fill('Test Address');
  48 |     await page.getByLabel('Hotline').fill('0900111222');
  49 |     await page.getByLabel('WiFi').fill('testwifi');
  50 |     await page.getByLabel('Username').or(page.getByLabel('Tên đăng nhập')).fill('test' + ts);
  51 |     await page.locator('input[type="password"]').first().fill('test123456');
  52 |     await page.locator('input[type="password"]').nth(1).fill('test123456');
  53 |     await page.getByText('Save').or(page.getByText('Lưu')).click();
  54 |     await page.waitForTimeout(1000);
  55 |     expect(page.url()).toContain('/admin/venues');
  56 |   });
  57 | 
  58 |   test('password validation shows inline error for short password', async ({ page }) => {
  59 |     await page.goto('/admin/venues/new');
  60 |     await page.waitForTimeout(500);
  61 |     await page.locator('input[type="password"]').first().fill('12345');
  62 |     await page.waitForTimeout(100);
  63 |     const errorMsg = page.getByText('6').first();
  64 |     expect(await errorMsg.isVisible()).toBeTruthy();
  65 |   });
  66 | });
  67 | 
```