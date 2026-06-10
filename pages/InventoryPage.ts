import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  get inventoryItems() {
    return this.page.locator('.inventory_item');
  }
  get cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }
  get cartIcon() {
    return this.page.locator('.shopping_cart_link');
  }

  addToCartBtn(name: string) {
    return this.page.locator('.inventory_item').filter({ hasText: name }).locator('button');
  }

  async addItem(name: string) {
    await this.page.locator('.inventory_item').filter({ hasText: name }).locator('button').click();
  }

  async addFirstItem() {
    await this.page.locator('.inventory_item').first().locator('button').click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async openCart() {
    await this.goToCart();
  }

  async assertItemsVisible() {
    await expect(this.inventoryItems).toHaveCount(6);
  }

  async assertCartCount(count: string) {
    await expect(this.cartBadge).toHaveText(count);
  }
}