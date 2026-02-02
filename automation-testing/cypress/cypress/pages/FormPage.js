class FormPage {

checkOutButton = '[data-test="checkout"]'
firstNameInput = '[data-test="firstName"]'
lastNameInput = '[data-test="lastName"]'
postalCodeInput = '[data-test="postalCode"]'
continueButton = '[data-test="continue"]'
errorMessage = '[data-test="error"]'
errorButton = '[data-test="error-button"]'
finishButton = '[data-test="finish"]'


clickCheckOutButton() {
  return cy.get(this.checkOutButton).click()
}

fillFirstName(first) {
    cy.get(this.firstNameInput).type(first)
  }

fillLastName(last) {
    cy.get(this.lastNameInput).type(last)
  }

fillPostalCode(postal) {
    cy.get(this.postalCodeInput).type(postal)
  }

 clickContinueButton() {
    cy.get(this.continueButton).click()
  }

fillCheckoutForm(first, last, postal) {
    this.fillFirstName(first)
    this.fillLastName(last)
    this.fillPostalCode(postal)
    this.clickContinueButton()
}

getErrorMessage() {
  return cy.get('[data-test="error"]')
}

clickErrorButton() {
  cy.get(this.errorButton).click()
}

  }

export default FormPage