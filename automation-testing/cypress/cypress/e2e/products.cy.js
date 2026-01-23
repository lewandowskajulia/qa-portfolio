describe('Products page', () => {

  const URL = 'https://www.saucedemo.com/'
  const VALID_USER = 'standard_user'
  const VALID_PASSWORD = 'secret_sauce'
  const PRODUCTS_PAGE = 'https://www.saucedemo.com/inventory.html'
  const INVENTORY_ITEM_PAGE = 'https://www.saucedemo.com/inventory-item.html'
  const CART = '.shopping_cart_link'

  beforeEach(() => {
    cy.visit(URL)
    cy.get('#user-name').type(VALID_USER)
    cy.get('#password').type(VALID_PASSWORD)
    cy.get('#login-button').click()
    cy.url().should('include', PRODUCTS_PAGE)

  })

  describe('Product list', () => {

      it('should display a list of products', () => {
        cy.get('.inventory_item').should('have.length', 6) 
      })

      it('should display product name, price and image for each product', () => {
        cy.get('.inventory_item').each(product => {
        cy.wrap(product).find('.inventory_item_name').should('be.visible')
        cy.wrap(product).find('.inventory_item_price').should('be.visible')
        cy.wrap(product).find('img').should('be.visible')
      })
    })
    })
  
  describe('Product details', () => {

    beforeEach(() => {
      cy.get('.inventory_item_name').first().click()
      cy.url().should('include', INVENTORY_ITEM_PAGE)
    })

      it('should open product details page after clicking on product name', () => {

        cy.get('.inventory_details_name').should('be.visible')
        cy.get('.inventory_details_price').should('be.visible')
      })

      it('should return to product list when clicking Back to products', () => {
        cy.get('[data-test="back-to-products"]').click()
        cy.url().should('include', PRODUCTS_PAGE)
      })

      
      it('should return to product list when clicking back', () => {
        cy.go('back')
        cy.url().should('include', PRODUCTS_PAGE)
      })
  })

  describe('Cart actions', () => {
    it('should show empty cart initially', () => {
      cy.get('.shopping_cart_badge').should('not.exist')
    });

    it('should add products to cart and update cart badge', () => {
      cy.get('[data-test^="add-to-cart"]').first().click()
      cy.get('[data-test^="add-to-cart"]').eq(1).click()
      cy.get('.shopping_cart_badge').should('have.text', '2')
    })

    it('should display added products in cart', () => {
      cy.get('[data-test^="add-to-cart"]').first().click()
      cy.get(CART).click()
      cy.get('.cart_item').should('have.length', 1)
    })

    it('should increment cart badge when adding multiple products', () => {
      cy.get('[data-test^="add-to-cart"]').eq(0).click()
      cy.get('.shopping_cart_badge').should('have.text', '1')
      cy.get('[data-test^="add-to-cart"]').eq(1).click()
      cy.get('.shopping_cart_badge').should('have.text', '2')
    })

    it('should change Add to cart button to Remove after adding product', () => {
      cy.get('[data-test^="add-to-cart"]').first().click()
      cy.get('[data-test^="remove"]').should('be.visible')
    })

    it('should decrease cart badge after removing product', () => {
      cy.get('[data-test^="add-to-cart"]').first().click()
      cy.get('.shopping_cart_badge').should('have.text', '1')
      cy.get('[data-test^="remove"]').first().click()
      cy.get('.shopping_cart_badge').should('not.exist')
    })

    it('should remove product from cart and update cart badge', () => {
      cy.get('[data-test^="add-to-cart"]').first().click()
      cy.get(CART).click()
      cy.get('.cart_item').should('have.length', 1)
      cy.get('[data-test^="remove"]').first().click()
      cy.get('.cart_item').should('have.length',0)
    })

    it('should remove the product using the remove button', () => {
      cy.get('[data-test^="add-to-cart"]').first().click()
      cy.get('.shopping_cart_badge').should('have.text', '1')
      cy.get('[data-test^="remove"]').first().click()
      cy.get('.shopping_cart_badge').should('not.exist')
    })

    it('should keep cart items after page refresh', () => {
      cy.get('[data-test^="add-to-cart"]').first().click()
      cy.get('.shopping_cart_badge').should('have.text', '1')
      cy.reload()
      cy.get('.shopping_cart_badge').should('have.text', '1')
    })
})


})