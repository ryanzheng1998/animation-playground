describe('spec', () => {
  it('test', () => {
    cy.visit('http://localhost:5173')
    cy.get('#box').trigger('mousedown')
  })
})
