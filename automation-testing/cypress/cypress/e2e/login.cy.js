describe('Login', () => {

  const URL = 'https://www.saucedemo.com/'
  const VALID_USER = 'standard_user'
  const VALID_PASSWORD = 'secret_sauce'

  beforeEach(() => {
    cy.visit(URL)
  })

  describe('Successful login', () => {
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
  })

  describe('Validation errors', () => {
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
  })

describe('Logout', () => {

  beforeEach(() => {
    cy.get('#user-name').type(VALID_USER)
    cy.get('#password').type(VALID_PASSWORD)
    cy.get('#login-button').click()
  })

    it('should log out the user and redirect to the login page', () => {
      cy.get('#react-burger-menu-btn').click()
      cy.get('#logout_sidebar_link').click()
      cy.url().should('eq', URL)
    })

    it('should not allow access to inventory page without login', () => {
      cy.get('#react-burger-menu-btn').click()
      cy.get('#logout_sidebar_link').click()
      cy.url().should('eq', URL)
      cy.go('back')
      cy.url().should('eq', URL)
      cy.get('[data-test="error"]').should('be.visible').and('contain', "Epic sadface: You can only access '/inventory.html' when you are logged in.")
    })
  })

})
  