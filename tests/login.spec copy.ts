// Step 2: Use it in EVERY test — clean and readable
// tests/login.spec.ts
test('valid login', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login('standard_user', 'secret_sauce')
  await expect(page).toHaveURL('/inventory.html')
})







  });