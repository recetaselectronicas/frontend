import { getDataTestId } from "../utils/getDataTestId"
import axios from 'axios';

Cypress.Commands.add('initDataBase', async () => {
    await axios.get('http://localhost:8080/init-test-e2e')
})

Cypress.Commands.add('login', ({ type, user, pass }) => {
    cy.get(getDataTestId(type)).click();
    cy.location('pathname').should('eq', '/login');


    cy.get(getDataTestId('user')).type(user)
    cy.get(getDataTestId('password')).type(pass)
    cy.get(getDataTestId('login-form')).submit()
})

Cypress.Commands.add('logout', () => {
    cy.get(getDataTestId('user-icon')).click()
    cy.get(getDataTestId('logout-button')).click()
    cy.location('pathname').should('eq', '/');
})


Cypress.Commands.add('navigateTo', (url) => {
    cy.get(getDataTestId('menu-drawer-button')).click();
    cy.get(getDataTestId(`"${url}"`)).click();
    cy.location('pathname').should('eq', url);
})

Cypress.Commands.add('visitHome', (url) => {
    cy.visit('/', {
        onBeforeLoad: (win) => {
            win.sessionStorage.clear()
        }
    })
})
