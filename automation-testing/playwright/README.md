# Playwright End-to-End Tests – SauceDemo

This repository contains automated end-to-end (E2E) tests written in **Playwright** for the SauceDemo application:  
 https://www.saucedemo.com/

The goal of this project is to practice and demonstrate practical skills in test automation, including real user scenarios, test structure, and gradual implementation of **Page Object Model (POM)** architecture.

---

##  Tech Stack

- Playwright
- TypeScript
- Node.js
- Playwright Test Runner

---

##  Test Coverage

###  Login Functionality
- successful login using button click and Enter key
- validation of empty fields
- invalid credentials handling
- locked-out user scenario
- case sensitivity (uppercase username/password)
- access restriction to `/inventory.html` without authentication
- session behavior after logout

---

### Inventory Page
- visibility of the *Products* header
- correct number of displayed products
- product details validation:
  - name
  - price
  - description

---

###  Shopping Cart
- adding and removing products
- cart badge counter updates
- adding multiple products
- cart persistence after page refresh
- cart state synchronization after product removal

---

###  Product Sorting
- default sorting by name (A → Z)
- sorting by name (Z → A)
- sorting by price:
  - low to high
  - high to low

---

###  Checkout & Order Process
- checkout form validation:
  - missing first name
  - missing last name
  - missing postal code
- closing error messages and resubmitting the form
- order summary verification:
  - product price
  - tax
  - total price calculation
- successful order completion

---

##  Running the Tests

- npm install
- npx playwright test
- npx playwright show-report

 ## Page Object Model (POM)

 The project is currently being refactored to follow the Page Object Model design pattern.