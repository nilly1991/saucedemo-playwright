import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../fixtures/testData';


test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await page.waitForURL(/inventory/);
  await inventory.addFirstItem();
  await inventory.openCart();
});


test('item appears in cart', async ({ page }) => {
  const cart = new CartPage(page);
  await cart.assertItemInCart('Sauce Labs Backpack');
});


test('Item appears in cart', async ({ page }) => {
  const cart = new CartPage(page);
  await expect(cart.cartItems).toHaveCount(1);
});

test('Continue shopping works', async ({ page }) => {
  const cart = new CartPage(page);
  await cart.continueShoppingBtn.click();
  await expect(page).toHaveURL(/inventory/);
});