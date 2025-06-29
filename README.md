# Sauce Demo E-commerce Test

This project contains automated tests for the Sauce Demo website using Playwright and TypeScript.

## Test Scenario

The test automates the following user journey:
1. Navigate to the homepage
2. Login with standard_user credentials
3. Verify redirect to products page
4. Add a product to cart
5. Navigate to cart page
6. Verify product is in cart
7. Take a screenshot of the cart page
8. Logout from the menu

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

```bash
npm install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests with UI mode
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

## Test Details

- **Test Site**: https://www.saucedemo.com/
- **Username**: standard_user
- **Password**: secret_sauce
- **Browser**: Chromium (configurable in playwright.config.ts)

## Features

- Uses dynamic waits with `await expect(...)` for reliable assertions
- Takes screenshots on test completion
- Follows Playwright best practices
- TypeScript support for better development experience 