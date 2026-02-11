import { test, expect } from '@playwright/test';

const url = 'https://www.saucedemo.com/';
const inventoryURL = 'https://www.saucedemo.com/inventory.html';


test.beforeEach(async ({ page }) => {
  await page.goto(url);
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(inventoryURL);

});

test.describe('Inventory page - general functionality', () => {

    test('should display the Products page header', async ({ page }) => {
      await expect(page.getByText('Products')).toBeVisible();
    });

    test('should display a list of products', async ({ page }) => {
      const products = page.locator('.inventory_item');
      await expect(products).toHaveCount(6);
    });


    test('should display name, price and description for the first product', async ({ page }) => {
      const product = page.locator('.inventory_item').first();
      await expect(product.locator('.inventory_item_name')).toBeVisible();
      await expect(product.locator('.inventory_item_price')).toBeVisible();
      await expect(product.locator('.inventory_item_desc')).toBeVisible();
    });

    test('should display name, price and description for all products', async ({ page }) => {
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


test.describe('Shopping cart functionality', () => {

    test('should add a product to the cart when clicking Add to cart', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('should remove a product from the cart when clicking Remove', async ({ page }) => {
        await page.click('text=Add to cart');
        await page.click('text=Remove');
        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    });

    test('should allow adding multiple products to the cart', async ({ page }) => {
        const buttons = page.locator('text=Add to cart');
        await buttons.nth(0).click();
        await buttons.nth(1).click();
        await buttons.nth(2).click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
    });
  
    test('should display added product in the cart', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page.locator('.cart_item')).toBeVisible();
    });

    test('should not display the cart badge when the cart is empty', async ({ page }) => {
        await expect(page.locator('.shopping_cart_badge')).toBeHidden();
    });

    test('should preserve cart state after page refresh', async ({ page }) => {
        await page.click('text=Add to cart');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.reload();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('should update the cart badge after removing a product from the cart', async ({ page }) => {
        await page.click('[data-test^="add-to-cart"]');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.click('[data-test^="remove"]');
        await page.goto(inventoryURL);
        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
      });
});


test.describe('Product sorting', () => {

    test('should sort products by name in ascending order by default', async ({ page}) => {
        await expect(page.locator('.product_sort_container')).toHaveValue("az");
        const names = await page.locator('.inventory_item_name').allTextContents();
        const sorted = [...names].sort();
        expect(names).toEqual(sorted);
    });

    test('should sort products by name in descending order', async ({ page }) => {
        await page.locator('[data-test="product-sort-container"]').selectOption('za');
        const names = await page.locator('.inventory_item_name').allTextContents();
        const sorted = [...names].sort().reverse();
        expect(names).toEqual(sorted);
    });

    test('should sort products by price from low to high', async ({ page }) => {
        await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
        const prices = await page.locator('.inventory_item_price').allTextContents();
        const numbers = prices.map(p => parseFloat(p.replace('$', '')));
        expect(numbers[0]).toBeLessThanOrEqual(numbers[numbers.length - 1]);
    
    });

    test('should sort products by price from high to low', async ({ page }) => {
        await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
        const prices = await page.locator('.inventory_item_price').allTextContents();
        const numbers = prices.map(p => parseFloat(p.replace('$', '')));
        expect(numbers[0]).toBeGreaterThanOrEqual(numbers[numbers.length - 1]);
  });

});