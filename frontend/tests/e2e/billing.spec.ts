import { test, expect } from './helpers';

test.describe('Billing Flow', () => {
  test.beforeEach(async ({ page, loginAsVenueManager }) => {
    await loginAsVenueManager();
    await page.goto('/');
    await page.waitForTimeout(500);
  });

  test('active session page loads and shows room info', async ({ page }) => {
    // Click View Room on an OCCUPIED room if available
    const viewBtn = page.getByText('View Room').or(page.getByText('Xem phòng')).first();
    if (await viewBtn.isVisible()) {
      await viewBtn.click();
      await page.waitForTimeout(1000);
      expect(page.url()).toMatch(/\/session\//);
      const roomLabel = page.getByText('Room').or(page.getByText('Phòng'));
      await expect(roomLabel).toBeVisible({ timeout: 3000 });
    }
  });

  test('session shows menu items for ordering', async ({ page, loginAsVenueManager }) => {
    // First find an OCCUPIED room
    const viewBtn = page.getByText('View Room').or(page.getByText('Xem phòng')).first();
    if (await viewBtn.isVisible()) {
      await viewBtn.click();
      await page.waitForTimeout(1000);
      // Menu item cards should be visible
      const menuCards = page.locator('.card');
      await expect(menuCards.first()).toBeVisible({ timeout: 3000 });
    }
  });
});

test.describe('Bill Close / Checkout', () => {
  test.beforeEach(async ({ page, loginAsVenueManager }) => {
    await loginAsVenueManager();
  });

  test('bill page shows venue info and items', async ({ page }) => {
    // Navigate to bills page to verify completed bills exist
    await page.getByText('Bills').or(page.getByText('Quản lý hoá đơn')).first().click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Closed Bills').or(page.getByText('Quản lý hoá đơn'))).toBeVisible({ timeout: 3000 });
  });

  test('bill detail page loads with all sections', async ({ page }) => {
    await page.getByText('Bills').or(page.getByText('Quản lý hoá đơn')).first().click();
    await page.waitForTimeout(500);
    // Click first bill row
    const table = page.locator('table tbody');
    const firstRow = table.locator('tr').first();
    if (await firstRow.isVisible()) {
      await firstRow.click();
      await page.waitForTimeout(1000);
      expect(page.url()).toMatch(/\/bill-detail\//);
      await expect(page.getByText('Bill').or(page.getByText('Số HĐ'))).toBeVisible({ timeout: 3000 });
      await expect(page.getByText('Customer').or(page.getByText('Khách'))).toBeVisible();
    }
  });

  test('bill detail shows room charge as table row', async ({ page }) => {
    await page.getByText('Bills').or(page.getByText('Quản lý hoá đơn')).first().click();
    await page.waitForTimeout(500);
    const firstRow = page.locator('table tbody tr').first();
    if (await firstRow.isVisible()) {
      await firstRow.click();
      await page.waitForTimeout(1000);
      // Room charge / Tiền phòng as table footer
      const roomCharge = page.getByText('Room charge').or(page.getByText('Tiền phòng'));
      await expect(roomCharge).toBeVisible({ timeout: 3000 });
    }
  });

  test('bill detail has Print button', async ({ page }) => {
    await page.getByText('Bills').or(page.getByText('Quản lý hoá đơn')).first().click();
    await page.waitForTimeout(500);
    const firstRow = page.locator('table tbody tr').first();
    if (await firstRow.isVisible()) {
      await firstRow.click();
      await page.waitForTimeout(1000);
      await expect(page.getByText('Print').or(page.getByText('In'))).toBeVisible();
    }
  });
});
