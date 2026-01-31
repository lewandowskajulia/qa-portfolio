import ProductsPage from '../pages/ProductsPage'
import LoginPage from '../pages/LoginPage'

const loginPage = new LoginPage()
const productsPage = new ProductsPage()

  const URL = 'https://www.saucedemo.com/'
  const VALID_USER = 'standard_user'
  const VALID_PASSWORD = 'secret_sauce'
  const PRODUCTS_PAGE = 'https://www.saucedemo.com/inventory.html'
  const INVENTORY_ITEM_PAGE = 'https://www.saucedemo.com/inventory-item.html'
  const CART = '.shopping_cart_link'

describe('Products page', () => {

  beforeEach(() => {
    loginPage.visit(URL)
    loginPage.login(VALID_USER, VALID_PASSWORD)
    cy.url().should('eq', PRODUCTS_PAGE)
  })

  describe('Product list', () => {

      it('should display a list of products', () => {
        productsPage.getInventoryItem().should('have.length', 6)
      })

      it('should display product name, price and image for each product', () => {
        productsPage.getInventoryItem().each(product => {
          productsPage.getItemName(product).should('be.visible')
          productsPage.getItemPrice(product).should('be.visible')
          productsPage.getItemImage(product).should('be.visible')
      })
    })
    })
  
  describe('Product details', () => {

    beforeEach(() => {
      cy.get('.inventory_item_name').first().click()
      cy.url().should('include', INVENTORY_ITEM_PAGE)
    })

      it('should open product details page after clicking on product name', () => {
        productsPage.getProductDetailsName().should('be.visible')
        productsPage.getProductDetailsPrice().should('be.visible')
      })

      it('should return to product list when clicking Back to products', () => {
        productsPage.backToProducts()
        cy.url().should('eq', PRODUCTS_PAGE)
      })

      
      it('should return to product list when clicking back', () => {
        cy.go('back')
        cy.url().should('eq', PRODUCTS_PAGE)
      })
  })

  describe('Cart actions', () => {
    it('should show empty cart initially', () => {
      productsPage.getCartBadge().should('not.exist')
    });

    it('should add products to cart and update cart badge', () => {
      productsPage.addToCart(0)
      productsPage.addToCart(1)
      productsPage.getCartBadge().should('have.text', '2')
    })

    it('should display added products in cart', () => {
      productsPage.addToCart(0)
      productsPage.openCart()
      productsPage.getCartLink().should('have.length', 1)
    })

    it('should increment cart badge when adding multiple products', () => {
      productsPage.addToCart(0)
      productsPage.getCartBadge().should('have.text', '1')
      productsPage.addToCart(1)
      productsPage.getCartBadge().should('have.text', '2')
    })

    it('should change Add to cart button to Remove after adding product', () => {
      productsPage.addToCart(0)
      productsPage.getRemoveButton().should('be.visible')
    })

    it('should decrease cart badge after removing product', () => {
      productsPage.addToCart(0)
      productsPage.getCartBadge().should('have.text', '1')
      productsPage.removeFromCart(0)
      productsPage.getCartBadge().should('not.exist')
    })

    it('should remove product from cart and update cart badge', () => {
      productsPage.addToCart(0)
      productsPage.openCart()
      productsPage.getInventoryItem().should('have.length', 1)
      productsPage.removeFromCart(0)
      productsPage.getInventoryItem().should('have.length',0)
    })

    it('should remove the product using the remove button', () => {
      productsPage.addToCart(0)
      productsPage.getCartBadge().should('have.text', '1')
      productsPage.removeFromCart(0)
      productsPage.getCartBadge().should('not.exist')
    })

    it('should keep cart items after page refresh', () => {
      productsPage.addToCart(0)
      productsPage.getCartBadge().should('have.text', '1')
      cy.reload()
      productsPage.getCartBadge().should('have.text', '1')
    })
})


})