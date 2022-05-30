"use strict"

function logInToMainPage() {
  cy.contains('Zaloguj się').click()
  cy.get('.custom-modal-log-in').should('be.visible')
  cy.get('input#email').type(Cypress.env('email'))
  cy.get('input#password').type(Cypress.env('password'), { log: false }).type('{enter}')
  cy.contains('Panel Dietly', { timeout: Cypress.env('timeout') })
}

function logOut() {
  cy.clearCookie('remember-me', { expiry: 'Thu, 01-Jan-1970 00:00:10 GMT', domain: 'dietly.pl', secure: true})
  cy.clearCookie('JSESSIONID', { expiry: 'Thu, 01-Jan-1970 00:00:00 GMT', domain: 'dietly.pl', secure: true, httpOnly: true })

  cy.visit('https://dietly.pl/')
  cy.contains('Zaloguj się')
}

describe('Log in to Dietly page Test', () => {
  beforeEach(() => {
    cy.visit('https://dietly.pl/')
  })
  it('Log in to Dietly.pl page', () => {
    logInToMainPage()
  })
  afterEach(() => {
    logOut()
  })
})
  
describe('Actions on active catering page Test', () => {
  beforeEach(() => {
    cy.visit('https://dietly.pl')
    logInToMainPage()
  })
  it('Go to panel.', () => {
    cy.goToPanel()
  })
  it('Add a new order.', () => {
    cy.goToPanel()
    cy.addOrderFromPanel(1)
  })
  it('Add a new order and edit it.', () => {
    cy.goToPanel()
    cy.addOrderFromPanel(1)
    cy.editOrder()
  })
  it('Add one order from the panel and one from basket.', () => {
    cy.goToPanel()
    cy.addOrderFromPanel(1)
    cy.editOrder()
    cy.addOrderFromBasket(2)
    cy.editOrder()
  })
  it('Add a new order and remove it.', () => {
    cy.goToPanel()
    cy.addOrderFromPanel(1)
    cy.editOrder()
    cy.removeOrder(1)
  })
  it('Add two new orders and remove them.', () => {
    cy.goToPanel()
    cy.addOrderFromPanel(1)
    cy.addOrderFromBasket(2)
    cy.removeOrder(2)
    cy.removeOrder(1)
  })
  afterEach(() => {
    logOut()
  })
})
  