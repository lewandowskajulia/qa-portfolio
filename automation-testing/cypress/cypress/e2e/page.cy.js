describe('Strona Główna', () => {
    it('corrected_page', () => {
      cy.visit('https://www.saucedemo.com/')
      cy.title().should('eq', 'Swag Labs')
    })
    it('wrong_page', () => {
      cy.visit('https://www.saucedemos.com/')
      cy.title().should('eq', 'Ta witryna jest nieosiągalna')
    })
  })