const {
    TEST_URL,
    TEST_USER_1,
    TEST_PASSWORD_1,
} = Cypress.env()

context('New User', () => {
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
        cy.visit(`${TEST_URL}/#/new-user`)
    })

    it('Clica no botão de voltar', () => {
        cy.get('[data-testid="backToUsersList"]').click()
        cy.url().should('eq', `${TEST_URL}/#/users-list`)
    })

    it('Validação: pessoa física', () => {
        cy.get('[data-testid="registerPerson"]').click()
        cy.get('[data-testid="title"]').contains('Dados do Usuário')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="usernameLabel"]').contains('Nome de usuário')
        cy.get('[data-testid="testUsername"]').type('pedrotest')
            .should('have.value', 'pedrotest')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="passwordLabel"]').contains('Senha')
        cy.get('[data-testid="password"]').type('pedrotest')
            .should('have.value', 'pedrotest')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="accessLevelLabel"]').contains('Nível de Acesso')
        cy.get('[data-testid="accessLevel"]').select('Administrador')
            .should('have.value', 'Administrador')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="emailLabel"]').contains('Email')
        cy.get('[data-testid="email"]').type('pedrotest@provider.com')
            .should('have.value', 'pedrotest@provider.com')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="phoneLabel"]').contains('Telefone')
        cy.get('[data-testid="phone"]').type('91983746599')
            .should('have.value', '(91) 98374-6599')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="nameLabel"]').contains('Nome completo')
        cy.get('[data-testid="name"]').type('Pedro Test')
            .should('have.value', 'Pedro Test')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="cpfLabel"]').contains('CPF')
        cy.get('[data-testid="cpf"]').type('12345678900')
            .should('have.value', '123.456.789-00')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="birthLabel"]').contains('Data de nascimento')
        cy.get('[data-testid="birth"]').type('12122020')
            .should('have.value', '12/12/2020')
        cy.get('[data-testid="save"]').click()

        cy.url().should('eq', `${TEST_URL}/#/users-list`)
        cy.get('[data-testid="usersList"]').contains('pedrotest')

        cy.visit(`${TEST_URL}/#/users-list`)
        cy.get('[data-testid="item0"]').click()
        cy.url().should('eq', `${TEST_URL}/#/dashboard`)
        cy.visit(`${TEST_URL}/#/profile`)
        cy.get('[data-testid="deleteUser"]').click()
        cy.get('[data-testid="yes"]').click()
        cy.url().should('eq', `${TEST_URL}/#/users-list`)
    })

    it('Validação: pessoa jurídica', () => {
        cy.get('[data-testid="registerCompany"]').click()
        cy.get('[data-testid="title"]').contains('Dados do Usuário')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="usernameLabel"]').contains('Nome de usuário')
        cy.get('[data-testid="testUsername"]').type('pedrotestcompany')
            .should('have.value', 'pedrotestcompany')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="passwordLabel"]').contains('Senha')
        cy.get('[data-testid="password"]').type('pedrotest')
            .should('have.value', 'pedrotest')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="accessLevelLabel"]').contains('Nível de Acesso')
        cy.get('[data-testid="accessLevel"]').select('Usuário')
            .should('have.value', 'Usuário')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="emailLabel"]').contains('Email')
        cy.get('[data-testid="email"]').type('pedrotest@provider.com')
            .should('have.value', 'pedrotest@provider.com')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="phoneLabel"]').contains('Telefone')
        cy.get('[data-testid="phone"]').type('91983746599')
            .should('have.value', '(91) 98374-6599')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="cnpjLabel"]').contains('CNPJ')
        cy.get('[data-testid="cnpj"]').type('11222333444400')
            .should('have.value', '11.222.333.4444-00')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="nameLabel"]').contains('Nome Fantasia')
        cy.get('[data-testid="name"]').type('Pedro Company')
            .should('have.value', 'Pedro Company')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="tradeNameLabel"]').contains('Razão social')
        cy.get('[data-testid="tradeName"]').type('Pedro Company')
            .should('have.value', 'Pedro Company')
        cy.get('[data-testid="save"]').click()
        cy.get('[data-testid="errorMessage"]')
            .contains('Preencha todos os campos')

        cy.get('[data-testid="descriptionLabel"]').contains('Descrição')
        cy.get('[data-testid="description"]')
            .type('testingtestingtestingtestingtestingtestingtestingtestingkda')
            .should(
                'have.value',
                'testingtestingtestingtestingtestingtestingtestingtestingkda'
            )
        cy.get('[data-testid="save"]').click()

        cy.url().should('eq', `${TEST_URL}/#/users-list`)
        cy.get('[data-testid="usersList"]').contains('pedrotest')

        cy.visit(`${TEST_URL}/#/users-list`)
        cy.get('[data-testid="item0"]').click()
        cy.url().should('eq', `${TEST_URL}/#/dashboard`)
        cy.visit(`${TEST_URL}/#/profile`)
        cy.get('[data-testid="deleteUser"]').click()
        cy.get('[data-testid="yes"]').click()
        cy.url().should('eq', `${TEST_URL}/#/users-list`)
    })
} )