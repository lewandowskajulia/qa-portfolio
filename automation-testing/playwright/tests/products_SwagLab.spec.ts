import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

});

test.describe('Testy ogólne', () => {

    test('Nagłowek strony', async ({ page }) => {
      await expect(page.getByText('Products')).toBeVisible();
    });

    test('Widoczna lista produktów', async ({ page }) => {
      const products = page.locator('.inventory_item');
      await expect(products).toHaveCount(6);
    });


    test('Pierwszy produkt zawiera nazwę, cenę i opis', async ({ page }) => {
      const product = page.locator('.inventory_item').first();
      await expect(product.locator('.inventory_item_name')).toBeVisible();
      await expect(product.locator('.inventory_item_price')).toBeVisible();
      await expect(product.locator('.inventory_item_desc')).toBeVisible();
    });

    test('Wszystkie produkty zawierają nazwę, cenę i opis', async ({ page }) => {
      const products = page.locator('.inventory_item');
      const count = await products.count();
    
      for (let n = 0; n < count; n++) {
        const product = products.nth(n);
        await expect(product.locator('.inventory_item_name')).toBeVisible();
        await expect(product.locator('.inventory_item_price')).toBeVisible();
        await expect(product.locator('.inventory_item_desc')).toBeVisible();
      }
    });

});


test.describe.only('Koszyk', () => {

    test('Przycisk Add to cart', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('Usunięcie produktu z koszyka za pomocą przycisku Remove', async ({ page }) => {
        await page.click('text=Add to cart');
        await page.click('text=Remove');
        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    });

  
});