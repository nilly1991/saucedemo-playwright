import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../fixtures/testData';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(users.standard.username, users.standard.password);
});

test('inventory loads correctly', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.assertItemsVisible();
});

test('add item to cart', async ({ page }) => {
  const inventory = new InventoryPage(page);

  await inventory.addItem('Sauce Labs Backpack');
  await inventory.assertCartCount('1');
});

test('Add item to cart updates badge', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addFirstItem();
  await expect(inventory.cartBadge).toHaveText('1');
});

test('Cart persists after refresh', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addFirstItem();
  await page.reload();
  await expect(inventory.cartBadge).toHaveText('1');
});