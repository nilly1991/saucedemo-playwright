import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await inventory.addFirstItem();
  await inventory.openCart();
  await cart.checkout();
});

test('Checkout info validation', async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await checkout.fillInfo('John', 'Doe', '12345');
  await expect(page).toHaveURL(/checkout-step-two/);
});

test('Empty checkout fields show error', async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await checkout.continueBtn.click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('Complete purchase successfully', async ({ page }) => {
  const checkout = new CheckoutPage(page);

  await checkout.fillInfo('John', 'Doe', '12345');
  await checkout.finish();

  await expect(checkout.successMsg).toHaveText('Thank you for your order!');
});