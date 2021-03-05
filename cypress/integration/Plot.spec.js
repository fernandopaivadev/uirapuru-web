const {
    TEST_URL,
    TEST_USER_2,
    TEST_PASSWORD_2,
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

context('Plot', () => {
    before(() => {
        login(TEST_USER_2, TEST_PASSWORD_2)
    })

    beforeEach(() => {
        cy.visit(`${TEST_URL}/#/plot?consumerUnitIndex=0&deviceIndex=0`)
    })

    it('Digita valores na Date Picker', () => {
        cy.get('[data-testid="datePicker"]').type('2021-02-28')
            .should('have.value', '2021-02-28')
        cy.get('[data-testid="search"]').click()
        cy.get('[data-testid="chartContainer"]').should('exist')
    })

    it('Clica em um valor do período', () => {
        cy.get('[data-testid="datePicker"]').type('2021-02-28')
            .should('have.value', '2021-02-28')
        cy.get('[data-testid="period"]').select('12h')
            .should('have.value', '12h')
        cy.get('[data-testid="search"]').click()
        cy.get('[data-testid="chartContainer"]').should('exist')
    })

    it('Digita um horário', () => {
        cy.get('[data-testid="datePicker"]').type('2021-02-28')
            .should('have.value', '2021-02-28')
        cy.get('[data-testid="period"]').select('12h')
            .should('have.value', '12h')
        cy.get('[data-testid="hour"]').type('15:00')
            .should('have.value', '15:00')
        cy.get('[data-testid="search"]').click()
        cy.get('[data-testid="chartContainer"]').should('exist')
    })

    it('Não há dados do dispositivo', () => {
        cy.get('[data-testid="datePicker"]').type('1999-02-28')
            .should('have.value', '1999-02-28')
        cy.get('[data-testid="search"]').click()
        cy.get('[data-testid="empty"]').contains('Não há dados do dispositivo')
    })

    it('Clica no botão Dashboard', () => {
        cy.get('[data-testid="dashboard"]').click()
        cy.url().should('eq', `${TEST_URL}/#/dashboard`)
    })
})