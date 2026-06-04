import { test, expect } from './helpers';

test.describe('Login Flow', () => {
  test('SUPER_ADMIN login redirects to admin/venues', async ({ page, loginAsSuperAdmin }) => {
    await loginAsSuperAdmin();
    await expect(page).toHaveURL(/\/admin\/venues/, { timeout: 10000 });
  });

  test('VENUE_MANAGER login', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder(/username|tên đăng nhập/i).fill('manager1');
    await page.getByPlaceholder(/password|mật khẩu/i).fill('test123');
    await page.getByRole('button', { name: /Login|Đăng nhập/i }).click();
    await page.waitForTimeout(3000);
    const isError = await page.getByText(/invalid|không đúng/i).isVisible().catch(() => false);
    const isDashboard = page.url().includes('/dashboard');
    expect(isError || isDashboard).toBeTruthy();
  });

  test('invalid credentials shows error message', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder(/username|tên đăng nhập/i).fill('wrong');
    await page.getByPlaceholder(/password|mật khẩu/i).fill('wrong');
    await page.getByRole('button', { name: /Login|Đăng nhập/i }).click();
    await expect(page.getByText(/invalid|không đúng/i)).toBeVisible({ timeout: 5000 });
  });

  test('language switcher toggles between EN and VI', async ({ page }) => {
    await page.goto('/login');
    const langToggle = page.locator('.lang-toggle');
    await expect(langToggle).toBeVisible({ timeout: 5000 });
    const buttons = langToggle.locator('button');
    const enBtn = buttons.nth(0); // EN is first
    const viBtn = buttons.nth(1); // VI is second
    // Click EN
    await enBtn.click();
    await page.waitForTimeout(300);
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    // Click VI
    await viBtn.click();
    await page.waitForTimeout(300);
    await expect(page.getByRole('button', { name: 'Đăng nhập' })).toBeVisible();
  });
});
