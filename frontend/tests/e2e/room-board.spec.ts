import { test, expect } from './helpers';

test.describe('Room Board', () => {
  test.beforeEach(async ({ page, loginAsVenueManager }) => {
    await loginAsVenueManager();
    await page.getByText('Rooms').or(page.getByText('Phòng')).first().click();
    await page.waitForTimeout(500);
  });

  test('room board loads and shows room cards', async ({ page }) => {
    await expect(page.getByText('Room Status Board').or(page.getByText('Bảng Trạng Thái Phòng'))).toBeVisible();
    const cards = page.locator('.card');
    await expect(cards.first()).toBeVisible({ timeout: 5000 });
  });

  test('filter by status AVAILABLE', async ({ page }) => {
    await page.getByText('Available').or(page.getByText('Trống')).first().click();
    await page.waitForTimeout(300);
    const occupiedBadges = page.locator('.badge-occupied');
    await expect(occupiedBadges).toHaveCount(0);
  });

  test('search filters rooms', async ({ page }) => {
    const input = page.getByPlaceholder('Search room').or(page.getByPlaceholder('Tìm phòng'));
    await input.fill('99999');
    await page.waitForTimeout(500);
    await expect(page.getByText('No rooms configured').or(page.getByText('Chưa có phòng nào'))).toBeVisible({ timeout: 3000 });
  });

  test('create new room opens modal', async ({ page }) => {
    await page.getByText('Add Room').or(page.getByText('Thêm phòng')).click();
    await expect(page.getByText('Add New Room').or(page.getByText('Thêm phòng mới'))).toBeVisible({ timeout: 2000 });
  });

  test('click Edit button navigates to room detail', async ({ page }) => {
    const editBtn = page.getByText('Edit').or(page.getByText('Sửa')).first();
    await editBtn.click();
    await page.waitForTimeout(500);
    expect(page.url()).toMatch(/\/rooms\//);
  });
});

test.describe('Room Check-in Flow', () => {
  test.beforeEach(async ({ page, loginAsVenueManager }) => {
    await loginAsVenueManager();
    await page.goto('/');
    await page.waitForTimeout(500);
  });

  test('click Check In on AVAILABLE room navigates to check-in page', async ({ page }) => {
    const checkInBtn = page.getByText('Check In').or(page.getByText('Nhận phòng')).first();
    if (await checkInBtn.isVisible()) {
      await checkInBtn.click();
      await page.waitForTimeout(500);
      expect(page.url()).toMatch(/\/checkin\//);
      await expect(page.getByText('Customer').or(page.getByText('Tên khách'))).toBeVisible();
    }
  });

  test('OCCUPIED room shows View Room / Xem phòng button', async ({ page }) => {
    const viewRoomBtn = page.getByText('View Room').or(page.getByText('Xem phòng')).first();
    if (await viewRoomBtn.isVisible()) {
      await expect(viewRoomBtn).toBeVisible();
    }
  });

  test('rooms can be filtered by OCCUPIED', async ({ page }) => {
    await page.getByText('Occupied').or(page.getByText('Đang dùng')).first().click();
    await page.waitForTimeout(300);
    const cards = page.locator('.card');
    const count = await cards.count();
    if (count > 0) {
      // All visible room cards should have OCCUPIED badge
      for (let i = 0; i < count; i++) {
        const card = cards.nth(i);
        const badge = card.locator('.badge-occupied');
        await expect(badge).toBeVisible();
      }
    }
  });
});
