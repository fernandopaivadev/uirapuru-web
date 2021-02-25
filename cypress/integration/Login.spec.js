const { TEST_URL, TEST_LOGIN, TEST_PASSWORD } = Cypress.env()

context('Login', () => {
    beforeEach(() => {
        cy.visit(`${TEST_URL}/#/login`)
    })
    it('Verifica layout', () => {
        cy.get('[data-testid="logo"]').should('exist')
        cy.get('[data-testid="logo"]').within(() => {
            cy.get('img').should('exist')
            cy.get('p').contains('Uirapuru')
        })
    })

    it('Inputs vazias', () => {
        cy.get('[data-testid="button"]').click()
        cy.get('[data-testid="loading"]').should('not.exist')
    })

    it('Input do email vazia', () => {
        cy.get('[data-testid="email"]').should('have.value', '')
        cy.get('[data-testid="password"]').type('testing')
            .should('have.value', 'testing')
        cy.get('[data-testid="button"]').click()
        cy.get('[data-testid="loading"]').should('not.exist')
    })

    it('Input da senha vazia', () => {
        cy.get('[data-testid="email"]').type('testing')
            .should('have.value', 'testing')
        cy.get('[data-testid="password"]').should('have.value', '')
        cy.get('[data-testid="button"]').click()
        cy.get('[data-testid="loading"]').should('not.exist')
    })

    it('Usuário não existente', () => {
        cy.get('[data-testid="email"]').type('FakeUsername')
            .should('have.value', 'FakeUsername')
        cy.get('[data-testid="password"]').type('123456')
            .should('have.value', '123456')
        cy.get('[data-testid="button"]').click()
        cy.get('[data-testid="loading"]').should('exist')
        cy.get('[data-testid="error"]').contains('Usuário não encontrado')
    })

    it('Senha incorreta', () => {
        cy.get('[data-testid="email"]').type(TEST_LOGIN)
            .should('have.value', TEST_LOGIN)
        cy.get('[data-testid="password"]').type('123456')
            .should('have.value', '123456')
        cy.get('[data-testid="button"]').click()
        cy.get('[data-testid="loading"]').should('exist')
        cy.get('[data-testid="error"]').contains('Senha incorreta')
    })

    it('Autenticação com sucesso', () => {
        cy.get('[data-testid="email"]').type(TEST_LOGIN)
            .should('have.value', TEST_LOGIN)
        cy.get('[data-testid="password"]').type(TEST_PASSWORD)
            .should('have.value', TEST_PASSWORD)
        cy.get('[data-testid="button"]').click()
        cy.get('[data-testid="loading"]').should('exist')
        cy.get('[data-testid="error"]').should('not.exist')
        cy.url().should('eq', `${TEST_URL}/#/dashboard`)
    })

    it('Esqueci minha senha', ()=> {
        cy.get('[data-testid="link"]').click()
        cy.url().should('eq', `${TEST_URL}/#/forgot-password`)
    })
})