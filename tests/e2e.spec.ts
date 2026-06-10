import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Full end-to-end checkout flow', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  // Login
  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  // Add item
  await inventory.addFirstItem();

  // Cart
  await inventory.openCart();
  await expect(cart.cartItems).toHaveCount(1);

  // Checkout
  await cart.checkout();
  await checkout.fillInfo('John', 'Doe', '12345');
  await checkout.finish();

  // Verify success
  await expect(checkout.successMsg).toBeVisible();
});