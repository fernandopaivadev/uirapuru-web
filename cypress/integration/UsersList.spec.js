const { TEST_URL, TEST_USER_1, TEST_PASSWORD_1 } = Cypress.env()

context('UsersList', () => {
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
        cy.visit(`${TEST_URL}/#/users-list`)
    })

    it('Verifica layout', () => {
        cy.get('[data-testid="title"]').contains('Buscando dados')
        cy.get('[data-testid="loading"]').should('exist')
        cy.get('[data-testid="title"]').contains('Usuários')
    })

    it('Escolhendo um usuário', () => {
        cy.get('[data-testid="item0"]').click()
        cy.get('[data-testid="title"]').contains('Buscando dados')
        cy.get('[data-testid="loading"]').should('exist')
        cy.url().should('eq', `${TEST_URL}/#/dashboard`)
    })

    it('Click no botão Novo Usuário', () => {
        cy.get('[data-testid="buttonNewUser"]').click()
        cy.url().should('eq', `${TEST_URL}/#/new-user`)
    })

    it('Click no botão Sair', () => {
        cy.get('[data-testid="exit"]').click()
        cy.url().should('eq', `${TEST_URL}/#/login`)
    })
})


