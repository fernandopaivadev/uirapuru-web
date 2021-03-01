const {
    TEST_URL,
    TEST_USER_2,
    TEST_PASSWORD_2,
    TEST_USER_3,
    TEST_PASSWORD_3,
    TEST_USER_4,
    TEST_PASSWORD_4,
} = Cypress.env()

const login = (username, password) => {
    cy.visit(`${TEST_URL}/#/login`)
    cy.get('[data-testid="email"]').type(username)
        .should('have.value', username)
    cy.get('[data-testid="password"]').type(password)
        .should('have.value', password)
    cy.get('[data-testid="button"]').click()
    cy.get('[data-testid="loading"]').should('exist')
    cy.get('[data-testid="error"]').should('not.exist')
    cy.url().should('eq', `${TEST_URL}/#/dashboard`)
}

context('Dashboard', () => {
    before(() => {
        login(TEST_USER_2, TEST_PASSWORD_2)
    })

    beforeEach(() => {
        cy.visit(`${TEST_URL}/#/dashboard`)
    })

    it('Verifica layout de dispositivos cadastrados', () => {
        Array.from(cy.get('[data-testid=devices]').should('exist'))
            .map((device, index) => {
                cy.get(`[data-testid=deviceIcon${index}]`).should('exist')
                cy.get(`[data-testid=real-time${index}]`).should('exist')
            })
    })

    it('Verifica layout da chart', () => {
        cy.get('[data-testid=charts]').should('exist')
    })

    it('Não há unidade consumidora cadastrada', () => {
        login(TEST_USER_3, TEST_PASSWORD_3)

        cy.get('[data-testid="noUnit"]')
            .contains('Cadastre uma unidade consumidora')
        cy.get('[data-testid="newUnit"]').should('exist')
    })

    it('Não há dispositivos cadastrados', () => {
        login(TEST_USER_4, TEST_PASSWORD_4)

        cy.get('[data-testid="empty"]')
            .contains('Não há dispositivos cadastrados')
        cy.get('[data-testid="buttonRegister"]').should('exist')
        cy.get('[data-testid="noData"]')
            .contains('Não há dados registrados nas últimas 24 horas')
    })
})