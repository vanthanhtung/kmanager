import { test as base } from '@playwright/test';

export const test = base.extend<{
  loginAsVenueManager: () => Promise<void>;
  loginAsSuperAdmin: () => Promise<void>;
}>({
  loginAsVenueManager: async ({ page }, use) => {
    await use(async () => {
      await page.goto('/login');
      await page.getByPlaceholder(/username|tên đăng nhập/i).fill('manager1');
      await page.getByPlaceholder(/password|mật khẩu/i).fill('test123');
      await page.getByRole('button', { name: /Login|Đăng nhập/i }).click();
      await page.waitForTimeout(2000);
    });
  },
  loginAsSuperAdmin: async ({ page }, use) => {
    await use(async () => {
      await page.goto('/login');
      await page.getByPlaceholder(/username|tên đăng nhập/i).fill('admin');
      await page.getByPlaceholder(/password|mật khẩu/i).fill('admin');
      await page.getByRole('button', { name: /Login|Đăng nhập/i }).click();
      await page.waitForURL('**/admin/venues*', { timeout: 10000 }).catch(() => {});
      await page.waitForTimeout(1000);
    });
  },
});

export { expect } from '@playwright/test';
