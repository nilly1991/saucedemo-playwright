import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  get firstName() {
    return this.page.getByPlaceholder('First Name');
  }
  get lastName() {
    return this.page.getByPlaceholder('Last Name');
  }
  get zip() {
    return this.page.getByPlaceholder('Zip/Postal Code');
  }
  get continueBtn() {
    return this.page.getByRole('button', { name: 'Continue' });
  }
  get finishBtn() {
    return this.page.getByRole('button', { name: 'Finish' });
  }
  get successMsg() {
    return this.page.locator('.complete-header');
  }


  async fillInfo(first: string, last: string, zip: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.zip.fill(zip);
    await this.continueBtn.click();
  }

  async finishOrder() {
    await this.finishBtn.click();
  }

  async finish() {
    await this.finishOrder();
  }

  async assertOrderComplete() {
    await expect(this.page.getByText('Thank you for your order')).toBeVisible();
  }
}