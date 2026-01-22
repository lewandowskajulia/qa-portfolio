describe('Products', () => {

  const URL = 'https://www.saucedemo.com/'
  const VALID_USER = 'standard_user'
  const VALID_PASSWORD = 'secret_sauce'

  beforeEach(() => {
    cy.visit(URL)
    cy.get('#user-name').type(VALID_USER)
    cy.get('#password').type(VALID_PASSWORD)
    cy.get('#login-button').click()
  })

    it('should display a list of products', () => {
      cy.get('.inventory_item').should('have.length', 6) 
     })
  
     it('should open product details page after clicking on product name', () => {
      cy.get('.inventory_item_name').first().click()
      cy.url().should('include', '/inventory-item.html')
      cy.get('.inventory_details_name').should('be.visible')
      cy.get('.inventory_details_price').should('be.visible')
    })

})