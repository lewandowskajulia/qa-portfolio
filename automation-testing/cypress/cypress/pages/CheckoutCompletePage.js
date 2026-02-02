class CheckoutCompletePage {
  title = '[data-test="complete-header"]'
  message = '[data-test="complete-text"]'

  completeTextShouldBeVisible() {
    cy.contains('Thank you for your order!').should('be.visible')
  }

  getMessage() {
    return cy.get(this.message)
  }
}

export default CheckoutCompletePage