import { test, expect } from './helpers';

test.describe('Manual Bill', () => {
  test.beforeEach(async ({ page, loginAsVenueManager }) => {
    await loginAsVenueManager();
    await page.getByText('Bills').or(page.getByText('Quản lý hoá đơn')).first().click();
    await page.waitForTimeout(500);
  });

  test('manual bill button exists', async ({ page }) => {
    await expect(page.getByText('Manual Bill').or(page.getByText('Tạo hoá đơn thủ công'))).toBeVisible();
  });

  test('navigates to manual bill creation page', async ({ page }) => {
    await page.getByText('Manual Bill').or(page.getByText('Tạo hoá đơn thủ công')).click();
    await page.waitForTimeout(500);
    expect(page.url()).toMatch(/\/bills\/manual/);
    await expect(page.getByText('Manual Bill').or(page.getByText('Tạo hoá đơn thủ công'))).toBeVisible({ timeout: 3000 });
  });

  test('manual bill form has all required fields', async ({ page }) => {
    await page.goto('/bills/manual');
    await page.waitForTimeout(500);
    await expect(page.getByLabel('Customer').or(page.getByLabel('Khách'))).toBeVisible();
    await expect(page.getByLabel('Start Time').or(page.getByLabel('Giờ bắt đầu'))).toBeVisible();
    await expect(page.getByLabel('End Time').or(page.getByLabel('Giờ kết thúc'))).toBeVisible();
    await expect(page.getByLabel(/Rate/).or(page.getByLabel(/Giá/)).first()).toBeVisible();
    await expect(page.getByLabel('Discount').or(page.getByLabel('Giảm giá'))).toBeVisible();
  });

  test('add item to manual bill', async ({ page }) => {
    await page.goto('/bills/manual');
    await page.waitForTimeout(500);
    const nameInput = page.getByPlaceholder('Name').or(page.getByPlaceholder('Tên')).first();
    await nameInput.fill('Beer Test');
    const qtyInput = page.getByPlaceholder('Qty').or(page.getByPlaceholder('SL')).first();
    await qtyInput.fill('3');
    const priceInput = page.locator('input[placeholder*="Price"]').or(page.locator('input[placeholder*="Giá"]')).first();
    await priceInput.fill('25000');
    await page.getByText('Add').or(page.getByText('Thêm')).first().click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Beer Test')).toBeVisible({ timeout: 2000 });
  });

  test('remove item from manual bill', async ({ page }) => {
    await page.goto('/bills/manual');
    await page.waitForTimeout(500);
    const nameInput = page.getByPlaceholder('Name').or(page.getByPlaceholder('Tên')).first();
    await nameInput.fill('RemoveMe');
    const qtyInput = page.getByPlaceholder('Qty').or(page.getByPlaceholder('SL')).first();
    await qtyInput.fill('1');
    const priceInput = page.locator('input[placeholder*="Price"]').or(page.locator('input[placeholder*="Giá"]')).first();
    await priceInput.fill('10000');
    await page.getByText('Add').or(page.getByText('Thêm')).first().click();
    await page.waitForTimeout(300);
    await expect(page.getByText('RemoveMe')).toBeVisible();
    const deleteBtn = page.locator('button').filter({ hasText: '✕' }).first();
    await deleteBtn.click();
    await page.waitForTimeout(300);
    await expect(page.getByText('RemoveMe')).toHaveCount(0);
  });

  test('manual bill auto-fills tendered amount on focus', async ({ page }) => {
    await page.goto('/bills/manual');
    await page.waitForTimeout(500);
    const nameInput = page.getByPlaceholder('Name').or(page.getByPlaceholder('Tên')).first();
    await nameInput.fill('Test');
    const qtyInput = page.getByPlaceholder('Qty').or(page.getByPlaceholder('SL')).first();
    await qtyInput.fill('2');
    const priceInput = page.locator('input[placeholder*="Price"]').or(page.locator('input[placeholder*="Giá"]')).first();
    await priceInput.fill('100000');
    await page.getByText('Add').or(page.getByText('Thêm')).first().click();
    await page.waitForTimeout(300);
    const tenderedInput = page.getByLabel('Amount Tendered').or(page.getByLabel('Số tiền khách đưa'));
    await tenderedInput.focus();
    await page.waitForTimeout(500);
    const val = await tenderedInput.inputValue();
    expect(val).toBeTruthy();
  });
});
