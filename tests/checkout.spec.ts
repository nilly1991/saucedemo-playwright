import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users, checkoutInfo } from '../fixtures/testData';

test('complete checkout flow', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login(users.standard.username, users.standard.password);

  await inventory.addItem('Sauce Labs Backpack');
  await inventory.goToCart();

  await cart.proceedToCheckout();

  await checkout.fillInfo(
    checkoutInfo.firstName,
    checkoutInfo.lastName,
    checkoutInfo.zip
  );

  await checkout.finishOrder();
  await checkout.assertOrderComplete();
});