import { test, expect } from '@playwright/test';

test('fill and submit form', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByText('Sign In').click();
  await page.fill('#email', 'customer@practicesoftwaretesting.com');
  await page.fill('#password', 'welcome01');
  await page.click('.btnSubmit:has-text("Login")');
  await page.waitForURL('**/account');
  expect(await page.url()).toContain('/account');
});

test('title', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  const title = await page.locator('title').textContent();
  expect(title).toBe('Practice Software Testing - Toolshop - v5.0');
});

test('get all cards', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  const cards = await page.locator('.card').all();
  expect(cards.length).toBeGreaterThanOrEqual(8);
  expect(cards.length).toBeLessThanOrEqual(9); // Depending on the version of the page, there might be 8 or 9 cards
});

// don't run this test with webkit
test('get card title', async ({ page, browserName }) => {
  test.skip(browserName !== 'webkit', 'This feature is Safari-only');
  await page.goto('https://practicesoftwaretesting.com/');
  const cardTitle = await page.locator('.card .card-title').first().textContent();
  expect(cardTitle).toBe('Selenium WebDriver'); // Depending on the version of the page, there might be extra whitespace around the title
});
