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


test.describe('Koszyk', () => {

    test('Przycisk Add to cart', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('Usunięcie produktu z koszyka za pomocą przycisku Remove', async ({ page }) => {
        await page.click('text=Add to cart');
        await page.click('text=Remove');
        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    });

    test('Dodanie wielu produktów do koszyka', async ({ page }) => {
        const buttons = page.locator('text=Add to cart');
        await buttons.nth(0).click();
        await buttons.nth(1).click();
        await buttons.nth(2).click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
    });
  
    test('Produkt po dodaniu jest widoczny w koszyku', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page.locator('.cart_item')).toBeVisible();
    });

    test('Badge nie jest widoczny przy pustym koszyku', async ({ page }) => {
        await expect(page.locator('.shopping_cart_badge')).toBeHidden();
    });

    test('Koszyk zapamiętuje stan po odświeżeniu strony', async ({ page }) => {
        await page.click('text=Add to cart');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.reload();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('Aktualizacja Produkty po usunięciu z koszyka', async ({ page }) => {
        await page.click('[data-test^="add-to-cart"]');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.click('[data-test^="remove"]');
        await page.goto('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
      })
});