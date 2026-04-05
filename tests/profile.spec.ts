import { test, expect } from '@playwright/test';

test('handle superhero profile tab', async ({ page, context }) => {
  await page.goto('https://gmxce.preview.codesignal.com/');
  await page.click('text=Sign In');
  await page.fill('#username', 'ironman');
  await page.fill('#password', 'armored123');
  await page.click('button[type=submit]');
  
  await expect(page.locator('text=Stark HQ')).toBeVisible();
  console.log(page.url());
  
  const [profilePage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('text=🦸 Profile')
  ]);
  
  await expect(profilePage).toHaveURL('https://gmxce.preview.codesignal.com/profile');
  await expect(profilePage.locator('text=Ironman Profile')).toBeVisible();

  profilePage.close();
  expect(page).toHaveURL('https://gmxce.preview.codesignal.com/home');
});