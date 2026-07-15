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

test('the landing page offers clear entry paths at narrow widths', async ({ page }) => {
  await page.goto('/calm-abiding');
  await expect(page.getByRole('heading', { level: 1, name: 'Buddhism: Calm Abiding' })).toBeVisible();

  await page.goto('/');
  await expect(page.getByText('Continue reading')).toBeVisible();
  await expect(page.getByText('Choose a current need')).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
});

test('a chapter has complete HTML and route metadata before JavaScript runs', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto('/calm-abiding');
  await expect(page).toHaveTitle('Buddhism: Calm Abiding · Centering');
  await expect(page.getByRole('heading', { level: 1, name: 'Buddhism: Calm Abiding' })).toBeVisible();
  await expect(page.getByText('A pain wakes you at three in the morning.')).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', '/calm-abiding');

  await page.goto('/how-to-use-this-book');
  await expect(page.getByRole('heading', { level: 1, name: 'How to Use This Book' })).toBeVisible();
  await expect(page.getByText(/Your reflections, exercise responses, and practice settings save only in this browser/)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Saved work' })).toHaveAttribute('href', '/notebook');

  await page.goto('/notebook');
  await expect(page).toHaveTitle('Saved work · Centering');
  await expect(page.getByRole('heading', { level: 1, name: 'Saved work' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Nothing saved yet' })).toBeVisible();

  await page.goto('/sources');
  await expect(page.getByRole('heading', { level: 1, name: 'Sources' })).toBeVisible();
  await expect(page.getByText(/^\d+ of \d+ sources, deduplicated and linked back/)).toBeVisible();
  await expect(page.locator('[id^="source-"]').first()).toBeVisible();

  await context.close();
});
