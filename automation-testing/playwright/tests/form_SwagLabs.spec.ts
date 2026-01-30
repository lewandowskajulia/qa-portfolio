import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await page.locator('[data-test="shopping-cart-link"]').click();

});

test.describe('Checkout form validation' , () => {

  test('should proceed to checkout overview when the form is filled with valid data', async ({ page }) => { 
    await page.locator('[data-test="checkout"]').click(); 
    await page.locator('[data-test="firstName"]').fill('Qwe'); 
    await page.locator('[data-test="lastName"]').fill('Qwe'); 
    await page.locator('[data-test="postalCode"]').fill('123'); 
    await page.locator('[data-test="continue"]').click(); 
    await expect(page.getByText('Checkout: Overview')).toBeVisible(); 
  });

test('should display an error message when first name is missing', async ({ page }) => {
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="lastName"]').fill('Qwe');
  await page.locator('[data-test="postalCode"]').fill('123');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');
});

test('should display an error message when last name is missing', async ({ page }) => {
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Qwe');
  await page.locator('[data-test="postalCode"]').fill('123');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');
});

test('should display an error message when postal code is missing', async ({ page }) => {
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Qwe');
  await page.locator('[data-test="lastName"]').fill('Qwe');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');
});

test('should allow form submission after closing the error message and providing missing data', async ({ page }) => {
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Qwe');
  await page.locator('[data-test="lastName"]').fill('Qwe');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');
  await page.locator('.error-button').click();
  await expect(page.locator('[data-test="error"]')).toBeHidden();
  await page.locator('[data-test="postalCode"]').fill('123');
  await page.locator('[data-test="continue"]').click();
  await expect(page.getByText('Checkout: Overview')).toBeVisible();
});

})


test.describe('Order summary and purchase process' , () => {

  test.beforeEach( async ({ page }) => {
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Qwe');
    await page.locator('[data-test="lastName"]').fill('Qwe');
    await page.locator('[data-test="postalCode"]').fill('123');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('.title')).toHaveText('Checkout: Overview'); 
   });

test('should display product details and total price in the order summary', async ({ page }) => {
  await expect(page.locator('.inventory_item_name')).toBeVisible();
  await expect(page.locator('.inventory_item_price')).toBeVisible();
  await expect(page.locator('.summary_total_label')).toBeVisible();
});

test('should display the same product price in the inventory and order summary', async ({ page }) => {
  const itemPrice = await page.locator('.inventory_item_price').textContent();
  const priceInSummary = await page.locator('.summary_subtotal_label').textContent();
  const itemPriceNumber = Number((itemPrice ?? '').replace('$', ''));
  const summaryPriceNumber = Number((priceInSummary ?? '').replace('Item total: $', ''));
  expect(itemPriceNumber).toBe(summaryPriceNumber);
});

test('should include tax in the total order price', async ({ page }) => {
  const itemPriceText = await page.locator('.summary_subtotal_label').textContent();
  const taxText = await page.locator('.summary_tax_label').textContent();
  const totalText = await page.locator('.summary_total_label').textContent();
  const itemPrice = Number((itemPriceText ?? '').replace('Item total: $', ''));
  const tax = Number((taxText ?? '').replace('Tax: $', ''));
  const total = Number((totalText ?? '').replace('Total: $', ''));
  expect(total).toBe(itemPrice + tax);
});

test('should complete the purchase successfully', async ({ page }) => {
  await page.locator('[data-test="finish"]').click();
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
  await expect(page.locator('.complete-text')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});

}) 