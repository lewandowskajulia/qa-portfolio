import LoginPage from '../pages/LoginPage'

const loginPage = new LoginPage()
const VALID_USER = 'standard_user'
const VALID_PASSWORD = 'secret_sauce'
const LOCKED_USER = 'locked_out_user'
const URL = 'https://www.saucedemo.com/'
const PRODUCTS_PAGE = 'https://www.saucedemo.com/inventory.html'


describe('Login', () => {

  beforeEach(() => {
  loginPage.visit()
  })

  describe('Successful login', () => {
    it('should log in successfully with valid credentials', () => {
    loginPage.login(VALID_USER, VALID_PASSWORD)
    cy.url().should('eq', PRODUCTS_PAGE)
    }) 

    it('should mask password input', () => {
      loginPage.passwordShouldBeMasked()
      })

    it('should submit login form when pressing Enter', () => {
      loginPage.fillUsername(VALID_USER)
      loginPage.submitWithEnter(VALID_PASSWORD)
      cy.url().should('eq', PRODUCTS_PAGE)
    })
  })

  describe('Validation errors', () => {
    it('should display an error for invalid username and password', () => {
      loginPage.fillUsername('wrong')
      loginPage.fillPassword('wrong')
      loginPage.clickLogin()
      loginPage.getErrorMessage().should('be.visible').and('contain','Epic sadface: Username and password do not match any user in this service')
    })

    it('should display an error when username and password are empty', () => {
      loginPage.clickLogin()
      loginPage.getErrorMessage().should('be.visible').and('contain', 'Epic sadface: Username is required')
    })

    it('should display an error when password is missing', () =>  {
      loginPage.fillUsername(VALID_USER)
      loginPage.clickLogin()
      loginPage.getErrorMessage().should('be.visible').and('contain', 'Epic sadface: Password is required')
    })

    it('should display an error when username is missing', () => {
      loginPage.fillPassword(VALID_PASSWORD)
      loginPage.clickLogin()
      loginPage.getErrorMessage().should('be.visible').and('contain', 'Epic sadface: Username is required')
    })

    it('should display an error for a locked out user', () => {
      loginPage.fillUsername(LOCKED_USER)
      loginPage.fillPassword(VALID_PASSWORD)
      loginPage.clickLogin()
      loginPage.getErrorMessage().should('be.visible').and('contain', 'Epic sadface: Sorry, this user has been locked out.')
    })
  })

describe.only('Logout', () => {

  beforeEach(() => {
    loginPage.login(VALID_USER, VALID_PASSWORD)
  })

    it('should log out the user and redirect to the login page', () => {
      loginPage.logout()
      cy.url().should('eq', URL)
    })

    it('should not allow access to inventory page without login', () => {
      loginPage.logout()
      cy.url().should('eq', URL)
      cy.go('back')
      cy.url().should('eq', URL)
      loginPage.getErrorMessage().should('be.visible').and('contain', "Epic sadface: You can only access '/inventory.html' when you are logged in.")
    })
  })

})
  