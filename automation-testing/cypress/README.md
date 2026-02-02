# Cypress E2E Tests – SauceDemo

## Project description
This repository contains end-to-end automated tests for the SauceDemo demo application.
The project was created as part of my QA portfolio to demonstrate my skills in test
automation using Cypress.

The tests cover the most important user flows, including login, product browsing,
cart functionality and checkout process.

## Tested areas
- Login and logout
- Homepage UI elements and validations
- Product list and product details
- Adding and removing products from the cart
- Cart persistence after page refresh
- Checkout form validation
- Order summary and price calculations
- Completing the purchase successfully
- Basic responsive check (mobile viewport)

## Tech stack / Tools
- Cypress (end-to-end testing)
- JavaScript (ES6)
- Page Object Model (POM) for test organization
- Node.js / npm for dependencies

## How to run tests

1. Clone the repository
2. Install dependencies:
   npm install
3. Run Cypress Test Runner:
   npx cypress open
4. Run tests in headless mode:
   npx cypress run

