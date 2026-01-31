class ProductsPage {

  inventoryItem = '[data-test="inventory-item"]'
  itemName = '[data-test="inventory-item-name"]'
  itemPrice = '[data-test="inventory-item-price"]'
  itemImage = 'img'
  addToCartButton = '[data-test^="add-to-cart"]'
  removeButton = '[data-test^="remove"]'
  cartBadge = '[data-test="shopping-cart-badge"]'
  cartLink = '[data-test="shopping-cart-link"]'
  backToProduktsButton = '[data-test="back-to-products"]'
  productDetailsName = '.inventory_details_name'
  productDetailsPrice = '.inventory_details_price'


  getInventoryItem() { 
    return cy.get(this.inventoryItem)
  }

  getItemName(product) {
    return cy.wrap(product).find(this.itemName)
  }

  getItemPrice(product) {
    return cy.wrap(product).find(this.itemPrice)
  }

  getItemImage(product) {
    return cy.wrap(product).find(this.itemImage)
  }

  getProductDetailsName() {
    return cy.get(this.productDetailsName)
  }

  getProductDetailsPrice() {
    return cy.get(this.productDetailsPrice)
  }
  
  addToCart(index = 0) {
    cy.get(this.addToCartButton).eq(index).click()
  }

  removeFromCart(index = 0) {
    cy.get(this.removeButton).eq(index).click()
  }
  getRemoveButton() {
    return cy.get(this.removeButton)
  }

  getCartBadge() {
    return cy.get(this.cartBadge)
  }

  getCartLink() {
    return cy.get(this.cartLink)
  }

  openCart() {
    cy.get(this.cartLink).click()
  }

  backToProducts() {
    cy.get(this.backToProduktsButton).click()
  }
}

export default ProductsPage