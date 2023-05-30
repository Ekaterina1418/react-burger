import { get } from 'cypress/types/lodash'

describe('drags ingredients to constructor works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.seedAndVisit()
    cy.viewport(1440, 1000)
  })

  it('should drag bun', () => {
    cy.get('[data-test=ingredients]').contains('Булка 1').trigger('dragstart')
    cy.get('[data-test=constructor]').trigger('drop')
    cy.get('[data-test=top_bun]').contains('Булка 1 (верх)').should('exist')
    cy.get('[data-test=bottom_bun]').contains('Булка 1 (низ)').should('exist')
  })

  it('should drag ingredient', () => {
    cy.get('[data-test=ingredients]')
      .contains('Ингредиент 1')
      .trigger('dragstart')
    cy.get('[data-test=constructor]').trigger('drop')
    cy.get('[data-test=ingredient]').contains('Ингредиент 1').should('exist')
    cy.get('[data-test=ingredients]')
      .contains('Ингредиент 2')
      .trigger('dragstart')
    cy.get('[data-test=constructor]').trigger('drop')
    cy.get('[data-test=ingredient]').contains('Ингредиент 2').should('exist')
  })

  it('Modal open', () => {
    cy.get('[data-test=ingredients]').contains('Ингредиент 1').click()
  })
})
