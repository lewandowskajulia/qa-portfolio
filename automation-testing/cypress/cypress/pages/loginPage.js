class LoginPage {
  usernameInput = '#user-name'
  passwordInput = '#password'
  loginBtn = '#login-button'

  login(user, password) {
    cy.get(this.usernameInput).type(standard_user)
    cy.get(this.passwordInput).type(secret_sauce)
    cy.get(this.loginBtn).click()
  }
}

export default new LoginPage()