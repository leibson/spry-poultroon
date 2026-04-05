import { test, expect } from '@playwright/test';
// TODO: Import test and expect modules from '@playwright/test'

// TODO: Define a test using test() function with a descriptive name like 'manage multiple tabs'
test('verify logout affects all open tabs', async ({ page, context }) => {

    // TODO: Navigate to 'http://localhost:3000/home' using page.goto()
    await page.goto('http://localhost:3000/login');

    // TODO: Click on the 'Sign In' button using page.click()
    await page.click('button[type="Sign In"]');

    // TODO: Fill in the username and password fields using page.fill()
    // Use the credentials: username='user1' and password='pass1'
    await page.fill('#username', 'user1');
    await page.fill('#password', 'pass1');

    // TODO: Click on the submit button to log in
    await page.click('button[type="submit"]');

    // TODO: Verify the URL has changed to 'http://localhost:3000/home'
    await expect(page).toHaveURL('http://localhost:3000/home');

    // TODO: Check if a specific text, like 'Welcome to the BookStore', is visible using page.locator()
    await expect(page.locator('text=Welcome to the BookStore')).toBeVisible();

    // TODO: Open a new tab by clicking on an element, e.g., a link with the text '👤 Account', using page.click() and context.waitForEvent('page')
    const [accountPage] = await Promise.all([
        context.waitForEvent('page'),
        page.click('text=Account')
    ]);

    // TODO: Wait for the new tab to load completely using page.waitForLoadState()
    await accountPage.waitForLoadState();

    // TODO: Ensure the new tab's URL is 'http://localhost:3000/account'
    await expect(accountPage).toHaveURL('http://localhost:3000/account');

    // TODO: Verify that a specific element on the new tab is visible, such as 'Your Account'
    await expect(accountPage.locator('text=Your Account')).toBeVisible();

    // TODO: Close the new tab
    await accountPage.close();

    // TODO: Check that the original tab is still functional by verifying its URL or a particular element is visible
    await expect(page).toHaveURL('http://localhost:3000/home');
    await expect(page.locator('text=Welcome to the BookStore')).toBeVisible();
});