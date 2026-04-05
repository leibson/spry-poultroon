import { test, expect } from '@playwright/test';

test('verify logout affects all open tabs', async ({ page, context }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('#username', 'user1');
  await page.fill('#password', 'pass1');
  await page.click('button[type="submit"]');
  
  // TODO: Open a new tab by clicking on the link to the account page. 
  // Wait for the new page event to capture the new tab and store it for further operations.
    const [accountPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('text=Account')
  ]);

  // TODO: Validate that the account page has loaded correctly by checking the URL and confirming the presence of the text "Your Account" on the page.
    await expect(accountPage).toHaveURL('http://localhost:3000/account');
    await expect(accountPage.locator('text=Your Account')).toBeVisible();

  // TODO: Perform logout operation on the main page and ensure that the change reflects across all open tabs by checking for the visibility of the 'Login' button on the account tab.
    await page.click('text=Logout');
    await expect(page.locator('text=Login')).toBeVisible();
    await expect(accountPage.locator('text=Login')).toBeVisible();
});