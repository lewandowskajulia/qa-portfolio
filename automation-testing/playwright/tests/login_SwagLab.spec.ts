import { test, expect } from '@playwright/test';

const loginCases = [
  { user: 'standard_user', pass: 'secret_sauce' },
];

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test.describe('Logowanie do Swag Labs', () => {
  for (const { user, pass } of loginCases) {

test('Poprawne dane', async ({ page }) => {
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.getByText('Products')).toBeVisible();
});

test('Przycisk Enter', async ({ page }) => {
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="password"]').press('Enter');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.getByText('Products')).toBeVisible();
});

  test('Błędne hasło', async ({ page }) => {
    await page.locator('[data-test="username"]').fill(user);
    await page.locator('[data-test="password"]').fill('1234');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Puste dane', async ({ page }) => {
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
});

test('Spacje w loginie i haśle', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('      ');
  await page.locator('[data-test="password"]').fill('      ');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Login z Caps Lockiem', async ({ page }) => {
  await page.locator('[data-test="username"]').press('CapsLock');
  await page.locator('[data-test="username"]').fill('STANDARD_USER');
  await page.locator('[data-test="password"]').press('CapsLock');
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Hasło z Caps Lockiem', async ({ page }) => {
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').press('CapsLock');
  await page.locator('[data-test="password"]').fill('SECRET_SAUCE');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Login i hasło z Caps Lockiem', async ({ page }) => {
  await page.locator('[data-test="password"]').press('CapsLock');
  await page.locator('[data-test="username"]').fill("STANDARD_USER");
  await page.locator('[data-test="password"]').fill('SECRET_SAUCE');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Brak hasła', async ({ page }) => {
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
});

test('Zablokowany użytkownik', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: Sorry, this user has been locked out.");
});

test('Reset błędu po ponownym zalogowaniu', async ({ page }) => {
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').fill('1234');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).not.toBeVisible();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Wejście na podtsronę "Produkty" bez zalogowania', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
});

test('Powrót do podstrony "Produkty" po wylogowaniu', async ({ page }) => {
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="login-button"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await page.goBack();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
});

}
});