import { expect, test } from '@playwright/test';

const publicRoutes = [
  '/',
  '/glossary',
  '/sources',
  '/index',
  '/notebook',
  '/how-to-use-this-book',
  '/what-calm-is',
  '/the-settled-body',
  '/the-quiet-mind',
  '/tranquility-by-judgment',
  '/enough-and-no-fear',
  '/calm-abiding',
  '/the-ordinary-mind',
  '/the-watercourse-way',
  '/stilling-the-mind',
  '/the-engineering-of-calm',
  '/the-calm-at-the-center',
  '/stillness-and-surrender',
  '/nature-and-simplicity',
  '/one-calm-many-doors',
  '/what-actually-works',
  '/building-your-practice',
  '/designing-for-calm',
  '/calm-is-not-numbness',
  '/routes/letting-go',
  '/routes/presence',
  '/routes/the-body',
  '/routes/perspective',
  '/routes/enough',
  '/routes/connection',
  '/routes/meaning',
];

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

test('every prerendered public route fits a phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of publicRoutes) {
    await page.goto(route);
    await expect(page.locator('#main')).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  }
});

test('the force or flow widget reports keyboard slider changes', async ({ page }) => {
  await page.goto('/the-watercourse-way');

  const slider = page.getByRole('slider', { name: 'how are you meeting it?' });
  await slider.focus();
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');

  await expect(slider).toHaveAttribute('aria-valuetext', /68 percent push/);
  await expect(
    page.getByRole('region', { name: 'Push against it, or move with it?' }).getByRole('status'),
  ).toContainText('still pushing, a little less');
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
