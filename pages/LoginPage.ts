import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  get username() {
    return this.page.getByPlaceholder('Username');
  }
  get password() {
    return this.page.getByPlaceholder('Password');
  }
  get loginBtn() {
    return this.page.getByRole('button', { name: 'Login' });
  }
  get errorMsg() {
    return this.page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async assertErrorVisible() {
    await expect(this.errorMsg).toBeVisible();
  }
}