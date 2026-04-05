import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://nsv35.preview.codesignal.com/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('ironman');
  await page.getByRole('textbox', { name: 'Password' }).fill('armored123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.goto('https://nsv35.preview.codesignal.com/');
  await expect(page.locator('html')).toBeVisible();
  await page.getByRole('heading', { name: 'Stark Industries HQ' }).click();
  await page.locator('body').press('Enter');
});