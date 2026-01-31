class HomePage {

  loginLogo = '.login_logo'
  usernameInput = '[data-test="username"]'
  passwordInput = '[data-test="password"]'
  loginButton = '[data-test="login-button"]'

  visit() {
    cy.visit('https://www.saucedemo.com/')
  }

  getLogo() {
    return cy.get(this.loginLogo)
  }

  getUsernameInput() {
    return cy.get(this.usernameInput)
  }

  getPasswordInput() {
    return cy.get(this.passwordInput)
  }

  getLoginButton() {
    return cy.get(this.loginButton)
  }


}

export default HomePage