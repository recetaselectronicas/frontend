/// <reference types="Cypress" />

import { getDataTestId } from "../../utils/getDataTestId"

context('RequestLinkupDoctor.spec', () => {
    it('entramos a la home', () => {
        // cy.initDataBase()
        cy.visit('/', {
            onBeforeLoad: (win) => {
                win.sessionStorage.clear()
            }
        })
    })

    it('vamos a la seccion de login del doctor y nos logeamos', () => {
        cy.login({ type: 'doctor', user: 'rosco', pass: '1234' })
    })

    it('entramos a la seccion de obras sociales', () => {
        cy.navigateTo('/obras-sociales')
    })

    it('y el boton de solicitar no esta habilitado', () => {
        cy.get(getDataTestId('request-button')).should('be.disabled')
    })

    it('seleccionamos una obra social (OSDE) y la solicitamos', () => {
        cy.get(getDataTestId('medical-insurance-select')).click();
        cy.get(getDataTestId('OSDE-select')).click();
        cy.get(getDataTestId('request-button')).click()
    })

    it('nos deslogeamos', () => {
        cy.logout()
    })

    it('nos logeamos como osde', () => {
        cy.login({ type: 'medicalInsurance', user: 'osde', pass: '1234' })
    })

    it('entramos a la seccion de solicitudes', () => {
        cy.navigateTo('/solicitudes')
    })

    it('y aceptamos la solicitud', () => {
        cy.get(getDataTestId('doctor-summary')).click();
        cy.get(getDataTestId('doctor-accept-1')).click();
    })

    it('y vemos en la seccion de doctores este nuevo doctor', () => {
        cy.navigateTo('/doctores').should('exist')
        cy.get(getDataTestId('doctor-card-3'))
    })

    it('y lo desvinculamos', () => {
        cy.get(getDataTestId('doctor-action-3')).click()
        cy.get(getDataTestId('doctor-card-3')).should('not.exist');
    })

})
