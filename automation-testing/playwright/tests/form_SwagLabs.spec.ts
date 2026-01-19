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

test.describe('Wypełnienie formularza' , () => {
  test('Poprawne wypełnienie formularza', async ({ page }) => { 
    await page.locator('[data-test="checkout"]').click(); 
    await page.locator('[data-test="firstName"]').fill('Qwe'); 
    await page.locator('[data-test="lastName"]').fill('Qwe'); 
    await page.locator('[data-test="postalCode"]').fill('123'); 
    await page.locator('[data-test="continue"]').click(); 
    await expect(page.getByText('Checkout: Overview')).toBeVisible(); 
  });

test('Wypełnienie formularza bez pierwszego imienia', async ({ page }) => {
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="lastName"]').fill('Qwe');
  await page.locator('[data-test="postalCode"]').fill('123');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');
});

test('Wypełnienie formularza bez nazwiska', async ({ page }) => {
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Qwe');
  await page.locator('[data-test="postalCode"]').fill('123');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');
});

test('Wypełnienie formularza bez kodu pocztowego', async ({ page }) => {
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Qwe');
  await page.locator('[data-test="lastName"]').fill('Qwe');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');
});

test('Zamknięcie komunikatu error oraz poprawne wypełnienie formularza', async ({ page }) => {
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


test.describe.only('Podsumowanie zamówienia i zakup produktu' , () => {
  test.beforeEach( async ({ page }) => {
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Qwe');
    await page.locator('[data-test="lastName"]').fill('Qwe');
    await page.locator('[data-test="postalCode"]').fill('123');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('.title')).toHaveText('Checkout: Overview'); 
   });

test('Podsumowanie zamówienia zawiera produkt i cene', async ({ page }) => {
  await expect(page.locator('.inventory_item_name')).toBeVisible();
  await expect(page.locator('.inventory_item_price')).toBeVisible();
  await expect(page.locator('.summary_total_label')).toBeVisible();
});

test('Cena produktu zgadza się z ceną produktu na podsumowaniu', async ({ page }) => {
  const itemPrice = await page.locator('.inventory_item_price').textContent();
  const priceInSummary = await page.locator('.summary_subtotal_label').textContent();
  const itemPriceNumber = Number(itemPrice.replace('$', ''));
  const summaryPriceNumber = Number(priceInSummary.replace('Item total: $', ''));
  expect(itemPriceNumber).toBe(summaryPriceNumber);
});

test('Do zakupu doliczany jest podatek', async ({ page }) => {
  const itemPriceText = await page.locator('.summary_subtotal_label').textContent();
  const taxText = await page.locator('.summary_tax_label').textContent();
  const totalText = await page.locator('.summary_total_label').textContent();
  const itemPrice = Number(itemPriceText.replace('Item total: $', ''));
  const tax = Number(taxText.replace('Tax: $', ''));
  const total = Number(totalText.replace('Total: $', ''));
  expect(total).toBe(itemPrice + tax);
});

test('Zakup produktu', async ({ page }) => {
  await page.locator('[data-test="finish"]').click();
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
  await expect(page.locator('.complete-text')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});

})