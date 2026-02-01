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

clickFinishButton() {
  cy.get(this.finishButton).click()
}




  itemName = '.inventory_item_name'
  itemPrice = '.inventory_item_price'
  subtotal = '.summary_subtotal_label'
  tax = '.summary_tax_label'
  total = '.summary_total_label'
  finishButton = '[data-test="finish"]'
  title = '.title'

  shouldBeVisible() {
    cy.get(this.title).should('have.text', 'Checkout: Overview')
  }

  getItemPrice() {
    return cy.get(this.itemPrice).invoke('text')
  }

  getSubtotal() {
    return cy.get(this.subtotal).invoke('text')
  }

  getTax() {
    return cy.get(this.tax).invoke('text')
  }

  getTotal() {
    return cy.get(this.total).invoke('text')
  }

  }

export default FormPage