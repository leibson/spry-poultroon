import { test, expect } from '@playwright/test';

test('ten books', async ({ page }) => {
  await page.goto('https://qup8i.preview.codesignal.com/');
  await page.getByRole('button', { name: 'Load more' }).click();
  //await page.getByRole('button', { name: 'Load more' }).click();
  
  await page.waitForFunction(() => {
    const button = document.querySelector('#load-more-btn');
    return button && button.textContent !== 'Loading...';
  });

  // Validate the number of books loaded is 10
  const booksCnt = await page.locator('.book-title').count();
  expect(booksCnt).toBe(10);
});