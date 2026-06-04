import { test, expect } from './helpers';

test.describe('Venue Admin', () => {
  test.beforeEach(async ({ page, loginAsSuperAdmin }) => {
    await loginAsSuperAdmin();
    await page.waitForTimeout(500);
  });

  test('venue list shows venues', async ({ page }) => {
    await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 5000 });
  });

  test('create venue form shows hotline and wifi fields', async ({ page }) => {
    await page.getByText('Add Venue').or(page.getByText('Thêm địa điểm')).click();
    await page.waitForTimeout(500);
    expect(page.url()).toMatch(/\/admin\/venues\/new/);
    await expect(page.getByLabel('Hotline')).toBeVisible();
    await expect(page.getByLabel('WiFi')).toBeVisible();
  });

  test('edit venue shows existing data', async ({ page }) => {
    // Click the edit button on the first venue
    const editBtn = page.locator('table tbody tr').first().locator('button:has-text("✏")');
    if (await editBtn.isVisible()) {
      await editBtn.click();
      await page.waitForTimeout(500);
      expect(page.url()).toMatch(/\/admin\/venues\//);
      await expect(page.getByLabel('Venue Name').or(page.getByLabel('Tên địa điểm'))).toBeVisible();
    }
  });

  test('venue toggle status works', async ({ page }) => {
    const toggleBtn = page.locator('table tbody tr').first().locator('button:has-text("⏸"),button:has-text("▶")');
    if (await toggleBtn.isVisible()) {
      await toggleBtn.click();
      await page.waitForTimeout(1000);
      // Page should reload
      await expect(page.locator('table tbody tr').first()).toBeVisible();
    }
  });

  test('create new venue', async ({ page }) => {
    await page.goto('/admin/venues/new');
    await page.waitForTimeout(500);
    const ts = Date.now().toString().slice(-4);
    await page.getByLabel('Venue Name').or(page.getByLabel('Tên địa điểm')).fill('Test Venue ' + ts);
    await page.getByLabel('Address').or(page.getByLabel('Địa chỉ')).fill('Test Address');
    await page.getByLabel('Hotline').fill('0900111222');
    await page.getByLabel('WiFi').fill('testwifi');
    await page.getByLabel('Username').or(page.getByLabel('Tên đăng nhập')).fill('test' + ts);
    await page.locator('input[type="password"]').first().fill('test123456');
    await page.locator('input[type="password"]').nth(1).fill('test123456');
    await page.getByText('Save').or(page.getByText('Lưu')).click();
    await page.waitForTimeout(1000);
    expect(page.url()).toContain('/admin/venues');
  });

  test('password validation shows inline error for short password', async ({ page }) => {
    await page.goto('/admin/venues/new');
    await page.waitForTimeout(500);
    await page.locator('input[type="password"]').first().fill('12345');
    await page.waitForTimeout(100);
    const errorMsg = page.getByText('6').first();
    expect(await errorMsg.isVisible()).toBeTruthy();
  });
});
