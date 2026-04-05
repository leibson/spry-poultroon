import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://jn2rj.preview.codesignal.com/books');
  await page.getByRole('textbox', { name: 'Search books...' }).fill('Hobbit');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Search' }).click();
  const page1 = await page1Promise;
  await page1.waitForLoadState();
  await expect(page1).toHaveURL('https://jn2rj.preview.codesignal.com/books/1');
  await expect(page1.getByText('The Hobbit by J.R.R. Tolkien')).toBeVisible();
  await page1.close();
  await expect(page.url()).toBe('https://jn2rj.preview.codesignal.com/books');
});