class CheckoutOverviewPage {
  itemName = '.inventory_item_name'
  itemPrice = '.inventory_item_price'
  subtotal = '.summary_subtotal_label'
  tax = '.summary_tax_label'
  total = '.summary_total_label'
  finishButton = '[data-test="finish"]'
  title = '.title'



  clickFinishButton() {
  cy.get(this.finishButton).click()
  }

  shouldBeVisible() {
    cy.get(this.title).should('have.text', 'Checkout: Overview')
  }

  getItemName() {
    return cy.get(this.itemName)
  }

  getItemNameText() { 
    return cy.get(this.itemName).invoke('text')
  }

  getItemPrice() {
    return cy.get(this.itemPrice)
  }

  getItemPriceText() {
    return cy.get(this.itemPrice).invoke('text')
  }
  getSubtotal() {
    return cy.get(this.subtotal)
  }

  getSubtotalText() {
    return cy.get(this.subtotal).invoke('text')
  }

    getTax() {
    return cy.get(this.tax)
  }

  getTaxText() {
    return cy.get(this.tax).invoke('text')
  }

  getTotal() {
    return cy.get(this.total)
  }

  getTotalText() {
    return cy.get(this.total).invoke('text')
  }
}

export default CheckoutOverviewPage