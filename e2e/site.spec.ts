import { expect, test } from '@playwright/test';

test('a chapter is readable at desktop and narrow widths', async ({ page }) => {
  await page.goto('/calm-abiding');
  await expect(page.getByRole('heading', { level: 1, name: 'Buddhism: Calm Abiding' })).toBeVisible();
  await expect(page.locator('main')).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
    .toBeTruthy();
});
