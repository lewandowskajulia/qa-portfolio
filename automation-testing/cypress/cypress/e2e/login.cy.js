describe('Login', () => {

  const URL = 'https://www.saucedemo.com/'
  const VALID_USER = 'standard_user'
  const VALID_PASSWORD = 'secret_sauce'

  beforeEach(() => {
    cy.visit(URL)
  })

    it('should display login form', () => {
      cy.get('#user-name').should('be.visible')
      cy.get('#password').should('be.visible')
      cy.get('#login-button').should('be.visible')
    })

    it('should log in successfully with valid credentials', () => {
      cy.get('#user-name').type(VALID_USER)
      cy.get('#password').type(VALID_PASSWORD)
      cy.get('#login-button').click()
      cy.url().should('include', 'https://www.saucedemo.com/inventory.html')
    }) 

    it('should mask password input', () => {
       cy.get('#password').should('have.attr', 'type', 'password')
    })

    it('should submit login form when pressing Enter', () => {
      cy.get('#user-name').type(VALID_USER)
      cy.get('#password').type(`${VALID_PASSWORD}{enter}`)
      cy.url().should('include', 'https://www.saucedemo.com/inventory.html')
    })

    it('should display an error for invalid username and password', () => {
      cy.get('#user-name').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('should display an error when username and password are empty', () => {
      cy.get('#login-button').click()
      cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username is required')
    })

    it('should display an error when password is missing', () => {
      cy.get('#user-name').type(VALID_USER)
      cy.get('#login-button').click()
      cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Password is required')
    })

    it('should display an error when username is missing', () => {
      cy.get('#password').type(VALID_PASSWORD)
      cy.get('#login-button').click()
      cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username is required')
    })

    it('should display an error for a locked out user', () => {
      cy.get('#user-name').type('locked_out_user')
      cy.get('#password').type(VALID_PASSWORD)
      cy.get('#login-button').click()
      cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Sorry, this user has been locked out.')
    })

    it('should log out the user and redirect to the login page', () => {
      cy.get('#user-name').type(VALID_USER)
      cy.get('#password').type(VALID_PASSWORD)
      cy.get('#login-button').click()
      cy.get('#react-burger-menu-btn').click()
      cy.get('#logout_sidebar_link').click()
      cy.url().should('eq', URL)
    })
  })
  