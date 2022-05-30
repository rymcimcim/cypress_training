// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('goToPanel', () => {
    cy.contains('Panel Dietly').click()
    cy.get('a.navigation__active-catering')
        .invoke('attr', 'target', '_self')
        .should('have.attr', 'target', '_self')
        .click()
    cy.contains('Smacznego', { timeout: Cypress.env('timeout') })
})

Cypress.Commands.add('goToPanelFromBasket', () => {
    cy.get('i.far.fa-home.toolbar-back-arrow').click()
    cy.contains('Smacznego', { timeout: Cypress.env('timeout') })
})

Cypress.Commands.add('addOrder', (orderNumber) => {
    cy.get('i.far.fa-arrow-circle-right').click()
    cy.get('div.day.is-available-for-edit.new-order').first().click()
    let buttonAndUlLevel = cy.get('div.hour-preferences').children('div')
    buttonAndUlLevel.click()
    buttonAndUlLevel.should('have.class', 'is-open')
    buttonAndUlLevel.children('ul').children('li').eq(0).click()
    cy.get('div').contains('Przejdź dalej').click()
    cy.get('div').contains('Dodaj do koszyka').click()
    cy.url().should('contain', '/koszyk')
    cy.get('div.card.card-tight.shopping-cart-card').children('div').first().children('div.cart-item').should('have.length', orderNumber)
    cy.goToPanelFromBasket()
    cy.get('a.toolbar-cart').children('button').children('span.button-mark').contains(orderNumber.toString())
})

Cypress.Commands.add('addOrderFromPanel', (orderNumber) => {
    cy.get('div').contains('Nowe zamówienie').click()

    cy.addOrder(orderNumber)
})

Cypress.Commands.add('goToBasketFromPanel', () => {
    cy.get('a.toolbar-cart').children('button').children('span.button-mark').click()
    cy.url().should('contain', '/koszyk')
})

Cypress.Commands.add('addOrderFromBasket', (orderNumber) => {
    cy.goToBasketFromPanel()
    cy.contains('Dodaj kolejną dietę').click()
    cy.url().should('contain', '/nowe-zamowienie')

    cy.addOrder(orderNumber)
})

Cypress.Commands.add('removeOrder', (orderNumber) => {
    cy.goToBasketFromPanel()
    cy.get('div').contains('Usuń dietę').click()
    cy.get('div.custom-modal-remove-diet__buttons').children('button').eq(1).click()
    if (orderNumber === 1) {
        cy.get('div').contains('Dodaj pierwszą dietę')
    } else {
        cy.get('div.card.card-tight.shopping-cart-card').children('div').first().children('div.cart-item').should('have.length', orderNumber - 1)
    }

    cy.goToPanelFromBasket()
    const spanButtonMark = cy.get('a.toolbar-cart').children('button').children('span.button-mark')
    if (orderNumber === 1) {
        spanButtonMark.should('not.exist')
    } else {
        spanButtonMark.contains((orderNumber - 1).toString())
    }
})

Cypress.Commands.add('editOrder', () => {
    cy.goToBasketFromPanel()
    cy.get('div').contains('Zmień dietę').click()
    cy.get('label')
        .contains('Kolacja')
        .children()
        .eq(1)
        .should('have.class', 'fa-check-square')
        .click()
        .should('have.class', 'fa-square')
    cy.get('div').contains('Przejdź dalej').click()
    cy.get('div').contains('Zaktualizuj koszyk').click()
    cy.url().should('contain', '/koszyk')
    cy.goToPanelFromBasket()
})