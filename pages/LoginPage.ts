// Step 1: Create  pages/LoginPage.ts
import { Page } from '@playwright/test'

export class LoginPage {
  // 1. Store the page
  constructor(private readonly page: Page) {}

  // 2. Define locators as properties
  private usernameInput = this.page.locator('[data-test="username"]')

  private passwordInput = this.page.locator('#password')
  private loginBtn = this.page.getByRole('button', { name: 'Login' })

  // 3. Define actions as methods
  async goto() {
    await this.page.goto('https://saucedemo.com')
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginBtn.click()
  }
}

