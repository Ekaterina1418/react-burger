import { get } from 'cypress/types/lodash'

describe('drags ingredients to constructor works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.seedAndVisit()
    cy.viewport(1440, 1000)
  })

  it('should drag bun', () => {
    cy.get('[data-test="Булка 1"]').trigger('dragstart')
    cy.get('[data-test=constructor]').trigger('drop')
    cy.get('[data-test="Булка 1"]').contains('(верх)').should('exist')
    cy.get('[data-test="Булка 1"]').contains(' (низ)').should('exist')
  })

  it('should drag ingredient', () => {
    cy.get('[data-test="Ингредиент 1"]')
      .contains('Ингредиент 1')
      .trigger('dragstart')
    cy.get('[data-test=constructor]').trigger('drop')
    cy.get('[data-test="Ингредиент 1"]')
      .contains('Ингредиент 1')
      .should('exist')
    cy.get('[data-test="Ингредиент 2"]')
      .contains('Ингредиент 2')
      .trigger('dragstart')
    cy.get('[data-test=constructor]').trigger('drop')
    cy.get('[data-test="Ингредиент 2"]')
      .contains('Ингредиент 2')
      .should('exist')
  })
})
describe('ingredient modal works correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.seedAndVisit()
    cy.viewport(1440, 1000)
  })
  it('Modal open and close', () => {
    cy.get('[data-test="Ингредиент 1"]').click()
    cy.get('[data-test=modal]').contains('Ингредиент 1')
    cy.get('div[data-test=button-close]').click()
    cy.contains('Детали ингредиента').should('not.exist')
  })
  it('Modal open and close overlay', () => {
    cy.get('[data-test="Ингредиент 1"]').click()
    cy.get('[data-test=modal]').contains('Ингредиент 1')
    cy.get('[data-test=close-overlay]').click({ force: true })
    cy.contains('Детали ингредиента').should('not.exist')
  })
})

describe('order modal works correctly', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
      fixture: 'user.json',
    })
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      fixture: 'order.json',
    }).as('postOrder')

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    )
    window.localStorage.setItem(
      'accessToken',
      JSON.stringify('test-accessToken')
    )

    cy.visit('http://localhost:3000/')
    cy.seedAndVisit()
    cy.viewport(1440, 1000)
  })
  
  it('check if the order has been created', () => {
    cy.get('[data-test="Булка 1"]').trigger('dragstart')
    cy.get('[data-test=constructor]').trigger('drop')
 

    cy.get('[data-test="Ингредиент 1"]')
      .contains('Ингредиент 1')
      .trigger('dragstart')
    cy.get('[data-test=constructor]').trigger('drop')
   
    cy.get('[data-test="Ингредиент 2"]')
      .contains('Ингредиент 2')
      .trigger('dragstart')
    cy.get('[data-test=constructor]').trigger('drop')
   

    cy.get('[data-test="Ингредиент 3"]')
      .contains('Ингредиент 3')
      .trigger('dragstart')
    cy.get('[data-test=constructor]').trigger('drop')
    

    cy.get('[data-test=order-button]').click()
    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093c',
        ],
      })
    cy.get('[data-test="3685"]').should('have.text', '3685')

    cy.get('div[data-test=button-close]').click()
    cy.contains('[data-test="3685"]').should('not.exist')
  })
})
