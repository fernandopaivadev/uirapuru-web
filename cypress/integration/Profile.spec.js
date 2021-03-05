const {
    TEST_URL,
    TEST_USER_1,
    TEST_PASSWORD_1,
} = Cypress.env()

context('Profile', () => {
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
        cy.visit(`${TEST_URL}/#/profile`)
    })

    it('Cria Novo Dispositivo', () => {
        cy.get('[data-testid="newDevice"]').click()
        cy.get('[data-testid="deviceId"]').type('12345678')
            .should('have.value', '12345678')
        cy.get('[data-testid="deviceName"]').type('Device Test')
            .should('have.value', 'Device Test')
        cy.get('[data-testid="saveDevice"').click()
    })

    it('Validação dos campos', () => {
        cy.get('[data-testid="idLabel0"]').contains('ID')
        cy.get('[data-testid="idName0"]').contains('Nome')

        cy.get('[data-testid="deviceId0"]').clear().should('have.value', '')
        cy.get('[data-testid="deviceName0"]').clear().should('have.value', '')
        cy.get('[data-testid="saveDevicesList0"]').click()
        cy.get('[data-testid="errorMessageDevicesList"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="deviceId0"]').type('87654321')
            .should('have.value', '87654321')
        cy.get('[data-testid="deviceName0"]').should('have.value', '')
        cy.get('[data-testid="saveDevicesList0"]').click()
        cy.get('[data-testid="errorMessageDevicesList"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="deviceId0"]').clear().should('have.value', '')
        cy.get('[data-testid="deviceName0"]').type('Device Renamed')
            .should('have.value', 'Device Renamed')
        cy.get('[data-testid="saveDevicesList0"]').click()
        cy.get('[data-testid="errorMessageDevicesList"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="deviceId0"]').type('87654321')
            .should('have.value', '87654321')
        cy.get('[data-testid="deviceName0"]')
            .should('have.value', 'Device Renamed')
        cy.get('[data-testid="saveDevicesList0"]').click()
        cy.get('[data-testid="successMessageDevicesList"]')
            .contains('Salvo com sucesso!')

        cy.get('[data-testid="deviceId0"]').should('have.value', '87654321')
        cy.get('[data-testid="deviceName0"]')
            .should('have.value', 'Device Renamed')
    })

    it('Exclui dispositivo', () => {
        cy.get('[data-testid="deleteDevicesList0"]').click()
        cy.get('[data-testid="yes"]').click()
    })

    it('Clica no botão Dashboard', () => {
        cy.get('[data-testid="dashboardButton"]').click()
        cy.url().should('eq', `${TEST_URL}/#/dashboard`)
    })
} )