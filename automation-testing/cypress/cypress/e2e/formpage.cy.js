describe('Cart and Checkout', () => {

  const URL = 'https://www.saucedemo.com/'
  const VALID_USER = 'standard_user'
  const VALID_PASSWORD = 'secret_sauce'
  const PRODUCTS_PAGE = 'https://www.saucedemo.com/inventory.html'
  const CART = '.shopping_cart_link'

    const FIRSTNAME = 'Jan'
    const LASTNAME = 'Nowak'
    const POSTALCODE = '12-345'

  function fillCheckoutForm(first, last, postal) {
    cy.get('[data-test="firstName"]').clear().type(first);
    cy.get('[data-test="lastName"]').clear().type(last);
    cy.get('[data-test="postalCode"]').clear().type(postal);
    cy.get('[data-test="continue"]').click();
  }

  beforeEach(() => {
    cy.visit(URL);
    cy.get('[data-test="username"]').type(VALID_USER);
    cy.get('[data-test="password"]').type(VALID_PASSWORD);
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', PRODUCTS_PAGE);
    cy.get('[data-test^="add-to-cart"]').first().click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.get(CART).click();
    cy.get('[data-test="checkout"]').click();

  });

  describe('filling out the form', () => {

    it('should fill out the form correctly', () => {
      fillCheckoutForm(FIRSTNAME, LASTNAME, POSTALCODE);
      cy.contains('Checkout: Overview').should('be.visible');
    });

    it('should show error when first name is missing', () => {
      cy.get('[data-test="lastName"]').type(LASTNAME);
      cy.get('[data-test="postalCode"]').type(POSTALCODE);
      cy.get('[data-test="continue"]').click();
      cy.get('[data-test="error"]').should('have.text', 'Error: First Name is required');
    });

    it('should show error when last name is missing', () => {
      cy.get('[data-test="firstName"]').type(FIRSTNAME);
      cy.get('[data-test="postalCode"]').type(POSTALCODE);
      cy.get('[data-test="continue"]').click();
      cy.get('[data-test="error"]').should('have.text', 'Error: Last Name is required');
    });

    it('should show error when postal code is missing', () => {
      cy.get('[data-test="firstName"]').type(FIRSTNAME);
      cy.get('[data-test="lastName"]').type(LASTNAME);
      cy.get('[data-test="continue"]').click();
      cy.get('[data-test="error"]').should('have.text', 'Error: Postal Code is required');
    });

    it('should close error message and fill out the form correctly', () => {
      cy.get('[data-test="firstName"]').type(FIRSTNAME);
      cy.get('[data-test="lastName"]').type(LASTNAME);
      cy.get('[data-test="continue"]').click();
      cy.get('[data-test="error"]').should('have.text', 'Error: Postal Code is required');
      cy.get('.error-button').click();
      cy.get('[data-test="error"]').should('not.exist');
      cy.get('[data-test="postalCode"]').type(POSTALCODE);
      cy.get('[data-test="continue"]').click();
      cy.contains('Checkout: Overview').should('be.visible');
    });

  });

  describe('order summary and purchase', () => {

    beforeEach(() => {
      fillCheckoutForm(FIRSTNAME, LASTNAME, POSTALCODE);
      cy.get('.title').should('have.text', 'Checkout: Overview');
    });

    it('should display product and price in order summary', () => {
      cy.get('.inventory_item_name').should('be.visible');
      cy.get('.inventory_item_price').should('be.visible');
      cy.get('.summary_total_label').should('be.visible');
    });

    it('should match product price with order summary subtotal', () => {
      cy.get('.inventory_item_price').invoke('text').then(itemPriceText => {
      const itemPrice = parseFloat(itemPriceText.replace('$', ''));
      cy.get('.summary_subtotal_label').invoke('text').then(summaryText => {
      const summaryPrice = parseFloat(summaryText.replace('Item total: $', ''));
      expect(itemPrice).to.equal(summaryPrice);
      });
    });
    });

    it('should add tax to the order total', () => {
      cy.get('.summary_subtotal_label').invoke('text').then(subtotalText => {
      const subtotal = parseFloat(subtotalText.replace('Item total: $', ''));
      cy.get('.summary_tax_label').invoke('text').then(taxText => {
      const tax = parseFloat(taxText.replace('Tax: $', ''));
      cy.get('.summary_total_label').invoke('text').then(totalText => {
      const total = parseFloat(totalText.replace('Total: $', ''));
      expect(total).to.equal(subtotal + tax);});
      });
    });
    });

    it('should complete the purchase successfully', () => {
      cy.get('[data-test="finish"]').click();
      cy.contains('Thank you for your order!').should('be.visible');
      cy.get('.complete-text').should('have.text','Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });

  });

});