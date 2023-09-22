describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('app is running!')
  })
})
// describe('My First Test', () => {
//   it('Sanity Test', () => {
//     cy.visit('/')
//     cy.contains('#header .text-3xl', 'Clips')
//   })
// })

