describe('Homepage', () => {

  const URL = 'https://www.saucedemo.com/'

  beforeEach(() => {
    cy.visit(URL)
  })

    it('should display correct page title for the login page and URL', () => {
      cy.title().should('eq', 'Swag Labs')
      cy.url().should('eq', 'https://www.saucedemo.com/')
    })

  it('should return 404 for non-existing page', () => {
    cy.request({
      url: 'https://www.saucedemo.com/non-existing-page',
      failOnStatusCode: false})
      .its('status').should('eq', 404)
    })

    it('should display Swag Labs logo', () => {
      cy.get('.login_logo').should('contain.text', 'Swag Labs')
    })

    it('should display login form', () => {
      cy.get('#user-name').should('be.visible')
      cy.get('#password').should('be.visible')
      cy.get('#login-button').should('be.visible')
    })

    it('should display correct placeholders for login inputs', () => {
      cy.get('#user-name').should('have.attr', 'placeholder', 'Username')
      cy.get('#password').should('have.attr', 'placeholder', 'Password')
    })
    
  it('should display login page correctly on mobile viewport', () => {
    cy.viewport('iphone-6')
    cy.get('#login-button').should('be.visible')
    })
  })