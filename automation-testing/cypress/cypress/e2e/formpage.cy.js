describe('Koszyk i checkout – SauceDemo', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');

    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.url().should('include', '/inventory.html');

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');

    cy.get('[data-test="shopping-cart-link"]').click();
  });

  describe('Wypełnienie formularza', () => {

    it('Poprawne wypełnienie formularza', () => {
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="firstName"]').type('Qwe');
      cy.get('[data-test="lastName"]').type('Qwe');
      cy.get('[data-test="postalCode"]').type('123');
      cy.get('[data-test="continue"]').click();

      cy.contains('Checkout: Overview').should('be.visible');
    });

    it('Wypełnienie formularza bez pierwszego imienia', () => {
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="lastName"]').type('Qwe');
      cy.get('[data-test="postalCode"]').type('123');
      cy.get('[data-test="continue"]').click();

      cy.get('[data-test="error"]')
        .should('have.text', 'Error: First Name is required');
    });

    it('Wypełnienie formularza bez nazwiska', () => {
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="firstName"]').type('Qwe');
      cy.get('[data-test="postalCode"]').type('123');
      cy.get('[data-test="continue"]').click();

      cy.get('[data-test="error"]')
        .should('have.text', 'Error: Last Name is required');
    });

    it('Wypełnienie formularza bez kodu pocztowego', () => {
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="firstName"]').type('Qwe');
      cy.get('[data-test="lastName"]').type('Qwe');
      cy.get('[data-test="continue"]').click();

      cy.get('[data-test="error"]')
        .should('have.text', 'Error: Postal Code is required');
    });

    it('Zamknięcie komunikatu error oraz poprawne wypełnienie formularza', () => {
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="firstName"]').type('Qwe');
      cy.get('[data-test="lastName"]').type('Qwe');
      cy.get('[data-test="continue"]').click();

      cy.get('[data-test="error"]')
        .should('have.text', 'Error: Postal Code is required');

      cy.get('.error-button').click();
      cy.get('[data-test="error"]').should('not.exist');

      cy.get('[data-test="postalCode"]').type('123');
      cy.get('[data-test="continue"]').click();

      cy.contains('Checkout: Overview').should('be.visible');
    });

  });

  describe.only('Podsumowanie zamówienia i zakup produktu', () => {

    beforeEach(() => {
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="firstName"]').type('Qwe');
      cy.get('[data-test="lastName"]').type('Qwe');
      cy.get('[data-test="postalCode"]').type('123');
      cy.get('[data-test="continue"]').click();

      cy.get('.title').should('have.text', 'Checkout: Overview');
    });

    it('Podsumowanie zamówienia zawiera produkt i cenę', () => {
      cy.get('.inventory_item_name').should('be.visible');
      cy.get('.inventory_item_price').should('be.visible');
      cy.get('.summary_total_label').should('be.visible');
    });

    it('Cena produktu zgadza się z ceną produktu na podsumowaniu', () => {
      cy.get('.inventory_item_price').invoke('text').then(itemPrice => {
        cy.get('.summary_subtotal_label').invoke('text').then(summaryPrice => {
          const itemPriceNumber = Number(itemPrice.replace('$', ''));
          const summaryPriceNumber = Number(
            summaryPrice.replace('Item total: $', '')
          );

          expect(itemPriceNumber).to.equal(summaryPriceNumber);
        });
      });
    });

    it('Do zakupu doliczany jest podatek', () => {
      cy.get('.summary_subtotal_label').invoke('text').then(itemText => {
        cy.get('.summary_tax_label').invoke('text').then(taxText => {
          cy.get('.summary_total_label').invoke('text').then(totalText => {

            const itemPrice = Number(itemText.replace('Item total: $', ''));
            const tax = Number(taxText.replace('Tax: $', ''));
            const total = Number(totalText.replace('Total: $', ''));

            expect(total).to.equal(itemPrice + tax);
          });
        });
      });
    });

    it('Zakup produktu', () => {
      cy.get('[data-test="finish"]').click();

      cy.contains('Thank you for your order!')
        .should('be.visible');

      cy.get('.complete-text')
        .should(
          'have.text',
          'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
        );
    });

  });

});