describe('Products', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.url().should('include', 'https://www.saucedemo.com/inventory.html')
  })
  it('powinno wyświetlić listę produktów', () => {
    cy.get('.inventory_item').should('have.length', 6) 
   })

   it('powinno otworzyć stronę szczegółów produktu', () => {
    cy.get('.inventory_item_name').first().click()
    cy.url().should('include', '/inventory-item.html?id=4')
    cy.get('.inventory_details_name').should('be.visible')
    cy.get('.inventory_details_price').should('be.visible')
    
  })
 
})