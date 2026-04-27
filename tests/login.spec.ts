import { test, expect } from '@playwright/test';

test('Sauce Demo login test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  //await page.locator('#user-name').fill('standard_user');
  await page.locator('[data-test="username"]').fill('standard_user');

    await page.locator('#password').fill('secret_sauce');


  await page.getByRole('button', { name: 'Login' }).click();









  });