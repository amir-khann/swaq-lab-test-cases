import { test, expect } from '@playwright/test';

// end-to-end flow
test.describe('Sauce Demo E-commerce Flow', () => {
  test('Complete user journey: login, add product to cart, verify cart, and logout', async ({ page }) => {
    // 1. Go to the homepage
    await page.goto('/');
    
    // Verify we're on the login page
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Log in with standard_user credentials
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // 3. Verify redirect to products page
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6); // Should have 6 products

    // 4. Add "Sauce Labs Backpack" to the cart
    const backpackSelector = '[data-test="add-to-cart-sauce-labs-backpack"]';
    const backpackName = 'Sauce Labs Backpack';
    await page.click(backpackSelector);
    // Verify the button changed to "Remove"
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    // Verify cart badge shows 1 item
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // 5. Navigate to the cart page
    await page.click('.shopping_cart_link');

    // 6. Verify that the product is visible in the cart
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(page.locator('.cart_item')).toHaveCount(1);
    // Debug: print cart page content
    const cartContent = await page.content();
    console.log(cartContent);
    await expect(page.locator('.inventory_item_name')).toHaveText(backpackName);
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

    // 7. Take a screenshot of the cart page
    await page.screenshot({ path: 'cart-page-screenshot.png', fullPage: true });

    // 8. Log out from the menu
    await page.click('#react-burger-menu-btn');
    await page.click('[data-test="logout-sidebar-link"]');

    // Verify we're back to the login page
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
}); 


// When to Split into Multiple Tests
// test.describe('Sauce Demo - E2E Flow in Separate Tests', () => {

//   test('Login with valid credentials', async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');
//     await page.fill('[data-test="username"]', 'standard_user');
//     await page.fill('[data-test="password"]', 'secret_sauce');
//     await page.click('[data-test="login-button"]');
//     await expect(page).toHaveURL(/.*inventory\.html/);
//     await expect(page.locator('.inventory_list')).toBeVisible();
//   });

//   test('Add product to cart and verify in cart page', async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');
//     await page.fill('[data-test="username"]', 'standard_user');
//     await page.fill('[data-test="password"]', 'secret_sauce');
//     await page.click('[data-test="login-button"]');

//     await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
//     await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
//     await page.click('.shopping_cart_link');

//     await expect(page).toHaveURL(/.*cart\.html/);
//     await expect(page.locator('.cart_item')).toHaveCount(1);
//     await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
//   });

//   test('Take a screenshot of the cart page', async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');
//     await page.fill('[data-test="username"]', 'standard_user');
//     await page.fill('[data-test="password"]', 'secret_sauce');
//     await page.click('[data-test="login-button"]');

//     await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
//     await page.click('.shopping_cart_link');

//     await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

//     // ✅ Screenshot step
//     await page.screenshot({ path: 'screenshots/cart-page.png', fullPage: true });
//   });

//   test('Logout from the application', async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');
//     await page.fill('[data-test="username"]', 'standard_user');
//     await page.fill('[data-test="password"]', 'secret_sauce');
//     await page.click('[data-test="login-button"]');

//     await page.click('#react-burger-menu-btn');
//     await page.click('[data-test="logout-sidebar-link"]');

//     await expect(page).toHaveURL('https://www.saucedemo.com/');
//     await expect(page.locator('[data-test="login-button"]')).toBeVisible();
//   });

// });