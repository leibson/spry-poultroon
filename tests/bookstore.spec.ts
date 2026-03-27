import { test, expect } from '@playwright/test';

test('ten books', async ({ page }) => {
  await page.goto('https://at5d7.preview.codesignal.com/');
  await page.getByRole('button', { name: 'Load more' }).click();

  await page.waitForFunction(() => {
    const button = document.querySelector('#load-more-btn');
    return button && button.textContent !== 'Loading...';
  });

  await page.getByRole('button', { name: 'Load more' }).click();

  await page.waitForFunction(() => {
    const button = document.querySelector('#load-more-btn');
    return !button;
  });

  // Validate the number of books loaded is 10
  const booksCnt = await page.locator('.book-title').count();
  expect(booksCnt).toBe(10);
});

test('random facts', async ({ page }) => {
  await page.goto('https://goo5u.preview.codesignal.com/books');

  // TODO: Click the 'Load Random Fact' button 4 times and ensure each text ends with a dot.
  for (let i = 0; i < 4; i++) {
    await page.click('#load-random-fact-btn');
    (await page.waitForSelector('#random-fact')).isVisible();
    expect(await page.textContent('#random-fact')).toMatch(/\.$/);
  };
});

test('last book verification', async ({ page }) => {
  await page.goto('https://goo5u.preview.codesignal.com/');

  // TODO: Click the 'Load More' button twice
  for (let i = 0; i < 2; i++) {
    await page.click('#load-more-btn');

    if (i === 0) {
      // Wait for the first batch of books to load
      await page.waitForFunction(() => {
        const button = document.querySelector('#load-more-btn');
        return button && button.textContent !== 'Loading...';
      });
     // await page.waitForSelector('.book-title');
    } else {
      // Wait for the second batch of books to load and ensure the 'Load More' button is no longer visible 
      await page.waitForFunction(() => {
        const button = document.querySelector('#load-more-btn');
        return !button || button.textContent !== 'Loading...';
      });
      ///await page.waitForSelector('.book-title');
    }
  };

  await page.waitForSelector('.book-title');

  // Verify that 10 book titles are loaded
  expect(await page.locator('.book-title').count()).toBe(10);

  // Validate the last book title
  expect(await page.locator('.book-title').nth(9).textContent()).toBe('The Lord of the Rings');
});


test('manage multiple tabs', async ({ page, context }) => {
  await page.goto('http://localhost:3000/home');
  await page.click('text=Sign In');
  await page.fill('#username', 'user1');
  await page.fill('#password', 'pass1');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('http://localhost:3000/home');
  await expect(page.locator('text=Welcome to the BookStore')).toBeVisible();
  
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('text=👤 Account')
  ]);
  
  await newPage.waitForLoadState('domcontentloaded');
  expect(await newPage.url()).toBe('http://localhost:3000/account');
  await expect(newPage.locator('text=Your Account')).toBeVisible();

  await newPage.close();
  expect(await page.url()).toBe('http://localhost:3000/home');
});