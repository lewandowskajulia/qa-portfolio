import FormPage from '../pages/FormPage'
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage'
import CheckoutCompletePage from '../pages/CheckoutCompletePage'
import LoginPage from '../pages/LoginPage'
import ProductsPage from '../pages/ProductsPage'

const loginPage = new LoginPage()
const productsPage = new ProductsPage()
const formPage = new FormPage()
const checkoutOverviewPage = new CheckoutOverviewPage()
const checkoutCompletePage = new CheckoutCompletePage()
const URL = 'https://www.saucedemo.com/'
const VALID_USER = 'standard_user'
const VALID_PASSWORD = 'secret_sauce'
const PRODUCTS_PAGE = 'https://www.saucedemo.com/inventory.html'
const FIRSTNAME = 'Jan'
const LASTNAME = 'Nowak'
const POSTALCODE = '12-345'


describe('Cart and Checkout', () => {



  beforeEach( () => {
    loginPage.visit(URL)
    loginPage.login(VALID_USER, VALID_PASSWORD)
    cy.url().should('include', PRODUCTS_PAGE);
    productsPage.addToCart(0)
    productsPage.getCartBadge().should('have.text', '1')
    productsPage.getCartLink().click()
    formPage.clickCheckOutButton()
    

  });

  describe('filling out the form', () => {

    it('should fill out the form correctly', () => {
      formPage.fillCheckoutForm(FIRSTNAME, LASTNAME, POSTALCODE);
      checkoutOverviewPage.shouldBeVisible()
    });

    it('should show error when first name is missing', () => {
      formPage.fillLastName(LASTNAME)
      formPage.fillPostalCode(POSTALCODE)
      formPage.clickContinueButton()
      formPage.getErrorMessage().should('have.text', 'Error: First Name is required')
    });

    it('should show error when last name is missing', () => {
      formPage.fillFirstName(FIRSTNAME)
      formPage.fillPostalCode(POSTALCODE)
      formPage.clickContinueButton()
      formPage.getErrorMessage().should('have.text', 'Error: Last Name is required');
    });

    it('should show error when postal code is missing', () => {
      formPage.fillFirstName(FIRSTNAME)
      formPage.fillLastName(LASTNAME);
      formPage.clickContinueButton()
      formPage.getErrorMessage().should('have.text', 'Error: Postal Code is required');
    });

    it('should close error message and fill out the form correctly', () => {
      formPage.fillFirstName(FIRSTNAME)
      formPage.fillLastName(LASTNAME);
      formPage.clickContinueButton()
      formPage.getErrorMessage().should('have.text', 'Error: Postal Code is required');
      formPage.clickErrorButton()
      formPage.getErrorMessage().should('not.exist');
      formPage.fillPostalCode(POSTALCODE)
      formPage.clickContinueButton()
      checkoutOverviewPage.shouldBeVisible()
    });

  });

  describe('order summary and purchase', () => {

    beforeEach(() => {
      formPage.fillCheckoutForm(FIRSTNAME, LASTNAME, POSTALCODE)
      checkoutOverviewPage.shouldBeVisible()
    });

    it('should display product and price in order summary', () => {
      checkoutOverviewPage.getItemName().should('be.visible')
      checkoutOverviewPage.getItemPrice().should('be.visible')
      checkoutOverviewPage.getTotal().should('be.visible')
    });

    it('should match product price with order summary subtotal', () => {
      checkoutOverviewPage.getItemPriceText().then(itemPriceText => {
      const itemPrice = parseFloat(itemPriceText.replace('$', ''));
      checkoutOverviewPage.getSubtotalText().then(summaryText => {
      const summaryPrice = parseFloat(summaryText.replace('Item total: $', ''));
      expect(itemPrice).to.equal(summaryPrice);
      });
    });
    });


    it('should add tax to the order total', () => {
      checkoutOverviewPage.getSubtotalText().then(subtotalText => {
      const subtotal = parseFloat(subtotalText.replace('Item total: $', ''));
      checkoutOverviewPage.getTaxText().then(taxText => {
      const tax = parseFloat(taxText.replace('Tax: $', ''));
      checkoutOverviewPage.getTotalText().then(totalText => {
      const total = parseFloat(totalText.replace('Total: $', ''));
      expect(total).to.equal(subtotal + tax);});
      });
    });
    });

    it('should complete the purchase successfully', () => {
      checkoutOverviewPage.clickFinishButton()
      checkoutCompletePage.completeTextShouldBeVisible()
      checkoutCompletePage.getMessage().should('have.text','Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });

  });

});