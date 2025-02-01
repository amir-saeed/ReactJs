describe('Product List', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display product list', () => {
    cy.get('[data-testid="product-list"]').should('exist')
    cy.get('[data-testid="product-item"]').should('have.length.greaterThan', 0)
  })

  it('should add item to cart', () => {
    cy.get('[data-testid="add-to-cart-button"]').first().click()
    cy.get('[data-testid="cart-count"]').should('have.text', '1')
  })
})