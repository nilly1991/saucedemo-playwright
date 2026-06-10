import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
  test('Valid login redirects to inventory page', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('Invalid login shows error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('wrong', 'wrong');
    await expect(login.errorMsg).toBeVisible();
  });

  test('Empty username/password validation', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('', '');
    await expect(login.errorMsg).toBeVisible();
  });

  test('Locked out user cannot login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
    await expect(login.errorMsg).toContainText('locked out');
  });
});