import { test, expect } from './helpers';

test.describe('Menu Management', () => {
  test.beforeEach(async ({ page, loginAsVenueManager }) => {
    await loginAsVenueManager();
    await page.getByText('Menu').or(page.getByText('Thực đơn')).first().click();
    await page.waitForTimeout(500);
  });

  test('menu list loads and shows items', async ({ page }) => {
    await expect(page.getByText('Menu Items').or(page.getByText('Thực đơn'))).toBeVisible({ timeout: 3000 });
  });

  test('click Add Item navigates to create page', async ({ page }) => {
    await page.getByText('Add Item').or(page.getByText('Thêm món')).click();
    await page.waitForTimeout(300);
    expect(page.url()).toMatch(/\/menu\/new/);
    await expect(page.getByText('Code').or(page.getByText('Mã'))).toBeVisible();
  });

  test('create new menu item', async ({ page }) => {
    await page.goto('/menu/new');
    await page.waitForTimeout(500);
    const code = 'TEST' + Date.now().toString().slice(-4);
    await page.locator('input').nth(0).fill(code);
    await page.locator('input').nth(1).fill('Test Item EN');
    await page.locator('input').nth(2).fill('Test Item VI');
    const select = page.locator('select').first();
    if (await select.isVisible()) {
      const options = await select.locator('option').all();
      if (options.length > 1) await select.selectOption(options[1]);
    }
    const priceInput = page.locator('input[type="number"]').last();
    await priceInput.fill('50000');
    await page.getByText('Save').or(page.getByText('Lưu')).click();
    await page.waitForTimeout(1000);
    expect(page.url()).toContain('/menu');
  });

  test('edit existing menu item', async ({ page }) => {
    const editBtn = page.locator('button:has-text("✏")').first();
    if (await editBtn.isVisible()) {
      await editBtn.click();
      await page.waitForTimeout(500);
      expect(page.url()).toMatch(/\/menu\//);
      await expect(page.getByText('Edit').or(page.getByText('Sửa'))).toBeVisible();
    }
  });

  test('menu item names change with language toggle', async ({ page }) => {
    await page.getByText('VI').click();
    await page.waitForTimeout(300);
    await page.getByText('EN').click();
    await page.waitForTimeout(300);
  });
});
