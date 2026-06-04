import { test, expect } from './helpers';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page, loginAsVenueManager }) => {
    await loginAsVenueManager();
    await page.getByText('Dashboard').or(page.getByText('Bảng điều khiển')).first().click();
    await page.waitForTimeout(500);
  });

  test('dashboard shows KPIs', async ({ page }) => {
    await expect(page.getByText('Revenue').or(page.getByText('Doanh thu')).first()).toBeVisible({ timeout: 3000 });
    // At least one KPI card should be visible
    const kpiCards = page.locator('.kpi-card');
    await expect(kpiCards.first()).toBeVisible({ timeout: 3000 });
  });

  test('dashboard shows revenue breakdown', async ({ page }) => {
    await expect(page.getByText('Room').or(page.getByText('Phòng')).first()).toBeVisible({ timeout: 3000 });
    await expect(page.getByText('Items').or(page.getByText('Món')).first()).toBeVisible();
  });

  test('brand logo navigates to dashboard', async ({ page }) => {
    // Click Rooms first
    await page.getByText('Rooms').or(page.getByText('Phòng')).first().click();
    await page.waitForTimeout(300);
    // Click kmanager brand
    await page.locator('.brand').click();
    await page.waitForTimeout(500);
    expect(page.url()).toMatch(/\/dashboard/);
  });
});

test.describe('Navigation', () => {
  test.beforeEach(async ({ page, loginAsVenueManager }) => {
    await loginAsVenueManager();
  });

  test('nav has all venue manager links', async ({ page }) => {
    await expect(page.getByText('Dashboard').or(page.getByText('Bảng điều khiển'))).toBeVisible({ timeout: 3000 });
    await expect(page.getByText('Rooms').or(page.getByText('Phòng'))).toBeVisible();
    await expect(page.getByText('Menu').or(page.getByText('Thực đơn'))).toBeVisible();
  });

  test('nav bills link works', async ({ page }) => {
    await page.getByText('Bills').or(page.getByText('Quản lý hoá đơn')).first().click();
    await page.waitForTimeout(500);
    expect(page.url()).toMatch(/\/bills/);
  });

  test('language toggle persists across navigation', async ({ page }) => {
    await page.getByText('VI').click();
    await page.waitForTimeout(300);
    await page.getByText('Phòng').first().click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Bảng Trạng Thái Phòng').or(page.getByText('Thêm phòng'))).toBeVisible({ timeout: 3000 });
  });
});
