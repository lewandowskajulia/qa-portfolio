import HomePage from '../pages/HomeSLPage'

const homePage = new HomePage()
const URL = 'https://www.saucedemo.com/'

describe('Page', () => {


  beforeEach(() => {
    homePage.visit()
  })

    it('should display correct page title for the login page and URL', () => {
      cy.title().should('eq', 'Swag Labs')
      cy.url().should('eq', URL)
    })

  it('should return 404 for non-existing page', () => {
    cy.request({
      url: 'https://www.saucedemo.com/non-existing-page',
      failOnStatusCode: false})
      .its('status').should('eq', 404)
    })

    it('should display Swag Labs logo', () => {
      homePage.getLogo().should('be.visible').and('contain.text', 'Swag Labs')
    })

    it('should display login form', () => {
      homePage.getUsernameInput().should('be.visible')
      homePage.getPasswordInput().should('be.visible')
      homePage.getLoginButton().should('be.visible')
    })

    it('should display correct placeholders for login inputs', () => {
      homePage.getUsernameInput().should('have.attr', 'placeholder', 'Username')
      homePage.getPasswordInput().should('have.attr', 'placeholder', 'Password')
    })
    
  it('should display login page correctly on mobile viewport', () => {
      cy.viewport('iphone-6')
      
      homePage.getLoginButton().should('be.visible')
    })
  })