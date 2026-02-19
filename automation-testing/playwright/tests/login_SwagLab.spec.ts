import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';


const loginCases = [{ user: 'standard_user', pass: 'secret_sauce' },];

const url = 'https://www.saucedemo.com/';
const inventoryURL = 'https://www.saucedemo.com/inventory.html';

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});




test.describe('Login functionality', () => {
  for (const { user, pass } of loginCases) {


test('should log in successfully with valid username and password', async ({ page }) => {
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(inventoryURL);
  await expect(page.getByText('Products')).toBeVisible();
});

test('should log in successfully when pressing Enter instead of clicking the login button', async ({ page }) => {
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="password"]').press('Enter');
  await expect(page).toHaveURL(inventoryURL);
  await expect(page.getByText('Products')).toBeVisible();
});

  test('should display an error message when an incorrect password is provided', async ({ page }) => {
    await page.locator('[data-test="username"]').fill(user);
    await page.locator('[data-test="password"]').fill('1234');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('should display an error message when username and password are empty', async ({ page }) => {
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
});

test('should display an error message when username and password contain only spaces', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('      ');
  await page.locator('[data-test="password"]').fill('      ');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('should not log in when the username is entered in uppercase', async ({ page }) => {
  await page.locator('[data-test="username"]').press('CapsLock');
  await page.locator('[data-test="username"]').fill('STANDARD_USER');
  await page.locator('[data-test="password"]').press('CapsLock');
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('should not log in when the password is entered in uppercase', async ({ page }) => {
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').press('CapsLock');
  await page.locator('[data-test="password"]').fill('SECRET_SAUCE');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('should not log in when both username and password are entered in uppercase', async ({ page }) => {
  await page.locator('[data-test="password"]').press('CapsLock');
  await page.locator('[data-test="username"]').fill("STANDARD_USER");
  await page.locator('[data-test="password"]').fill('SECRET_SAUCE');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('should display an error message when password is missing', async ({ page }) => {
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
});

test('should display a locked out message when logging in with a blocked user account', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: Sorry, this user has been locked out.");
});

test('should clear the error message after a successful login following a failed attempt', async ({ page }) => {
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').fill('1234');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).not.toBeVisible();
  await expect(page).toHaveURL(inventoryURL);
});

test('should prevent access to the inventory page when the user is not logged in', async ({ page }) => {
  await page.goto(inventoryURL);
  await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
});

test('should prevent access to the inventory page after the user logs out', async ({ page }) => {
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="login-button"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await page.goBack();
  await expect(page).toHaveURL(url);
  await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
});

}

test('should clear the password field after page refresh', async ({ page }) => {
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').fill(pass);
  await page.reload();

  await expect(page.locator('[data-test="password"]')).toHaveValue('');
});

test('password field should have type password', async ({ page }) => {
  await expect(page.locator('[data-test="password"]')).toHaveAttribute('type', 'password');
});

test('should not log in with extremely long username and password', async ({ page }) => {
  const longString = 'a'.repeat(500);

  await page.locator('[data-test="username"]').fill(longString);
  await page.locator('[data-test="password"]').fill(longString);
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('should require login after session cookie is removed', async ({ page, context }) => {
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="login-button"]').click();

  await context.clearCookies();
  await page.goto(inventoryURL);
  await expect(page).toHaveURL(url);
});
});