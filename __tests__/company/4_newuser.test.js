import { Selector, ClientFunction } from 'testcafe'
import { TEST_URL, TEST_LOGIN, TEST_PASSWORD } from '../../tests.env.json'

import storage from '../../src/services/storage'

fixture('/new-user').page(TEST_URL)

const getPageUrl = ClientFunction(() => window.location.href)
const isUserRegistered = ClientFunction((username, storage) => {
    const usersList = storage.read('users-list')

    const user = usersList.find(user => user.username === username)

    if (user) {
        return true
    } else {
        return false
    }
})

test('NewUser test', async t => {
    await t
        .typeText('#email', TEST_LOGIN)
        .expect(Selector('#email').value).eql(TEST_LOGIN)
        .typeText('#password',TEST_PASSWORD)
        .expect(Selector('#password').value).eql(TEST_PASSWORD)
        .click('#button')
        .expect(Selector('#loading').exists).ok()
        .wait(10000)
        .expect(getPageUrl()).contains('/dashboard')

        .navigateTo(`${TEST_URL}/#/new-user`)
        .expect(getPageUrl()).contains('/new-user')
        .click('#backToUsersList')
        .expect(getPageUrl()).contains('/users-list')

        .navigateTo(`${TEST_URL}/#/new-user`)
        .expect(getPageUrl()).contains('/new-user')
        .click('#registerCompany')
        .expect(Selector('#companyUserForm').exists).ok()
        .typeText('#username', 'usercompany')
        .expect(Selector('#username').value).eql('usercompany')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#password', 'usercompany')
        .expect(Selector('#password').value).eql('usercompany')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#email', 'usercompany@provider.com')
        .expect(Selector('#email').value).eql('usercompany@provider.com')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#phone', '11111111111')
        .expect(Selector('#phone').value).eql('(11) 11111-1111')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .click('#accessLevel')
        .click(Selector('#accessLevel').find('option').withText('Administrador'))
        .expect(Selector('#accessLevel').value).eql('Administrador')
        .click('#accessLevel')
        .click(Selector('#accessLevel').find('option').withText('Usuário'))
        .expect(Selector('#accessLevel').value).eql('Usuário')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#cnpj', '77777777777777')
        .expect(Selector('#cnpj').value).eql('77.777.777.7777-77')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#name', 'testing')
        .expect(Selector('#name').value).eql('testing')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#tradeName', 'testing')
        .expect(Selector('#tradeName').value).eql('testing')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText(
            '#description',
            'testingnowtestingnowtestingnowtestingnowtestingnow'
        )
        .expect(Selector('#tradeName').value).eql('testing')
        .click('#save')
        .wait(10000)
        .expect(getPageUrl()).contains('users-list')
        .expect(isUserRegistered('usercompany', storage)).ok()
})