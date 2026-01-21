describe('Strona Główna', () => {
    it('should display correct page title for the login page', () => {
      cy.visit('https://www.saucedemo.com/')
      cy.title().should('eq', 'Swag Labs')
    })

  it('should return 404 for non-existing page', () => {
    cy.request({
      url: 'https://www.saucedemo.com/non-existing-page',
      failOnStatusCode: false
    }).its('status').should('eq', 404)
    })

    it('should display Swag Labs logo', () => {
      cy.visit('https://www.saucedemo.com/')
      cy.get('.login_logo').should('contain.text', 'Swag Labs')
    })
  })