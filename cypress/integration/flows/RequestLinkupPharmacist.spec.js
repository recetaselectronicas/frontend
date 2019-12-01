/// <reference types="Cypress" />

import { getDataTestId } from "../../utils/getDataTestId"

context('RequestLinkupPharmacist', () => {
    it('entramos a la home', () => {
        // cy.initDataBase()
        cy.visitHome()
    })

    it('vamos a la seccion de login del farmaceutico y nos logeamos', () => {
        cy.login({ type: 'pharmacist', user: 'andale', pass: '1234' })
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
        cy.get(getDataTestId('pharmacist-summary')).click();
        cy.get(getDataTestId('pharmacist-accept-1')).click();
    })

    it('y vemos en la seccion de farmaceuticos este nuevo farmaceutico', () => {
        cy.navigateTo('/farmaceuticos').should('exist')
        cy.get(getDataTestId('pharmacist-card-1'))
    })

    it('y lo desvinculamos', () => {
        cy.get(getDataTestId('pharmacist-action-1')).click()
        cy.get(getDataTestId('pharmacist-card-1')).should('not.exist');
    })

})
