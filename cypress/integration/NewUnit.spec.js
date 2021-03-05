const {
    TEST_URL,
    TEST_USER_1,
    TEST_PASSWORD_1,
} = Cypress.env()

context('New Unit', () => {
    before(() => {
        cy.visit(`${TEST_URL}/#/login`)
        cy.get('[data-testid="email"]').type(TEST_USER_1)
            .should('have.value', TEST_USER_1)
        cy.get('[data-testid="password"]').type(TEST_PASSWORD_1)
            .should('have.value', TEST_PASSWORD_1)
        cy.get('[data-testid="button"]').click()
        cy.get('[data-testid="loading"]').should('exist')
        cy.get('[data-testid="error"]').should('not.exist')
        cy.url().should('eq', `${TEST_URL}/#/dashboard`)
    })

    beforeEach(() => {
        cy.visit(`${TEST_URL}/#/new-unit`)
    })

    it('Clica no botão Voltar', () => {
        cy.get('[data-testid="back"]').click()
        cy.url().should('eq',`${TEST_URL}/#/profile`)
    })

    it('Verifica layout', () => {
        cy.get('[data-testid="title"]').contains('Dados da Unidade Consumidora')
        cy.get('[data-testid="numberLabel"]').contains('Número')
        cy.get('[data-testid="unitNameLabel"]')
            .contains('Nome da unidade consumidora')
        cy.get('[data-testid="addressLabel"]').contains('Endereço')
        cy.get('[data-testid="zipLabel"]').contains('CEP')
        cy.get('[data-testid="cityLabel"]').contains('Cidade')
        cy.get('[data-testid="stateLabel"]').contains('Estado')
    })

    it('Validação', () => {
        cy.get('[data-testid="saveUnit"]').click()
        cy.get('[data-testid="errorMessageUnit"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="number"]').type('456123')
            .should('have.value', '456123')
        cy.get('[data-testid="saveUnit"]').click()
        cy.get('[data-testid="errorMessageUnit"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="unitName"]').type('Test Name')
            .should('have.value', 'Test Name')
        cy.get('[data-testid="saveUnit"]').click()
        cy.get('[data-testid="errorMessageUnit"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="address"]').type('Test Address')
            .should('have.value', 'Test Address')
        cy.get('[data-testid="saveUnit"]').click()
        cy.get('[data-testid="errorMessageUnit"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="zip"]').type('55847123')
            .should('have.value', '55847-123')
        cy.get('[data-testid="saveUnit"]').click()
        cy.get('[data-testid="errorMessageUnit"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="city"]').type('Test City')
            .should('have.value', 'Test City')
        cy.get('[data-testid="saveUnit"]').click()
        cy.get('[data-testid="errorMessageUnit"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="state"]').type('Test State')
            .should('have.value', 'Test State')
        cy.get('[data-testid="saveUnit"]').click()
        cy.url().should('eq', `${TEST_URL}/#/profile`)
        cy.get('[data-testid="units"]').contains('Test Name')
    })
})