# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Login Flow >> language switcher toggles between EN and VI
- Location: tests/e2e/login.spec.ts:28:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.lang-toggle')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.lang-toggle')

```

```yaml
- heading "kmanager" [level=2]
- text: Tên đăng nhập
- textbox "Nhập tên đăng nhập"
- text: Mật khẩu
- textbox "Nhập mật khẩu"
- button "Đăng nhập"
```

# Test source

```ts
  1  | import { test, expect } from './helpers';
  2  | 
  3  | test.describe('Login Flow', () => {
  4  |   test('SUPER_ADMIN login redirects to admin/venues', async ({ page, loginAsSuperAdmin }) => {
  5  |     await loginAsSuperAdmin();
  6  |     await expect(page).toHaveURL(/\/admin\/venues/, { timeout: 10000 });
  7  |   });
  8  | 
  9  |   test('VENUE_MANAGER login', async ({ page }) => {
  10 |     await page.goto('/login');
  11 |     await page.getByPlaceholder(/username|tên đăng nhập/i).fill('manager1');
  12 |     await page.getByPlaceholder(/password|mật khẩu/i).fill('test123');
  13 |     await page.getByRole('button', { name: /Login|Đăng nhập/i }).click();
  14 |     await page.waitForTimeout(3000);
  15 |     const isError = await page.getByText(/invalid|không đúng/i).isVisible().catch(() => false);
  16 |     const isDashboard = page.url().includes('/dashboard');
  17 |     expect(isError || isDashboard).toBeTruthy();
  18 |   });
  19 | 
  20 |   test('invalid credentials shows error message', async ({ page }) => {
  21 |     await page.goto('/login');
  22 |     await page.getByPlaceholder(/username|tên đăng nhập/i).fill('wrong');
  23 |     await page.getByPlaceholder(/password|mật khẩu/i).fill('wrong');
  24 |     await page.getByRole('button', { name: /Login|Đăng nhập/i }).click();
  25 |     await expect(page.getByText(/invalid|không đúng/i)).toBeVisible({ timeout: 5000 });
  26 |   });
  27 | 
  28 |   test('language switcher toggles between EN and VI', async ({ page }) => {
  29 |     await page.goto('/login');
  30 |     const langToggle = page.locator('.lang-toggle');
> 31 |     await expect(langToggle).toBeVisible({ timeout: 5000 });
     |                              ^ Error: expect(locator).toBeVisible() failed
  32 |     const buttons = langToggle.locator('button');
  33 |     const enBtn = buttons.nth(0); // EN is first
  34 |     const viBtn = buttons.nth(1); // VI is second
  35 |     // Click EN
  36 |     await enBtn.click();
  37 |     await page.waitForTimeout(300);
  38 |     await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  39 |     // Click VI
  40 |     await viBtn.click();
  41 |     await page.waitForTimeout(300);
  42 |     await expect(page.getByRole('button', { name: 'Đăng nhập' })).toBeVisible();
  43 |   });
  44 | });
  45 | 
```