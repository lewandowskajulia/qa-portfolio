class LoginPage {

  usernameInput = '[data-test="username"]'
  passwordInput = '[data-test="password"]'
  loginButton = '[data-test="login-button"]'
  errorMessage = '[data-test="error"]'

  visit() {
    cy.visit('https://www.saucedemo.com/')
  }

  fillUsername(username) {
    cy.get(this.usernameInput).type(username)
  }

  fillPassword(password) {
    cy.get(this.passwordInput).type(password)
  }

  clickLogin() {
    cy.get(this.loginButton).click()
  }

  submitWithEnter(password) {
    cy.get(this.passwordInput).type(`${password}{enter}`)
  }

  login(username, password) {
    this.fillUsername(username)
    this.fillPassword(password)
    this.clickLogin()
  }

  logout() {
      cy.get('#react-burger-menu-btn').click()
      cy.get('#logout_sidebar_link').click()
  }

  getErrorMessage() {
    return cy.get(this.errorMessage)
  }

  passwordShouldBeMasked() {
    cy.get(this.passwordInput).should('have.attr', 'type', 'password')
  }
}

export default LoginPage