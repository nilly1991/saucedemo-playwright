import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  get cartItems() {
    return this.page.locator('.cart_item');
  }
  get checkoutBtn() {
    return this.page.getByRole('button', { name: 'Checkout' });
  }
  get continueShoppingBtn() {
    return this.page.getByRole('button', { name: 'Continue Shopping' });
  }

  async assertItemInCart(name: string) {
    await expect(this.page.locator('.cart_item').filter({ hasText: name })).toBeVisible();
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }

  async checkout() {
    await this.proceedToCheckout();
  }
}