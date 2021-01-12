import { Selector, ClientFunction } from 'testcafe'
import { TEST_URL, TEST_LOGIN, TEST_PASSWORD } from '../tests.env.json'

import storage from '../src/services/storage'
// import api from '../src/services/api'

fixture('/new-user').page(TEST_URL)

const getPageUrl = ClientFunction(() => window.location.href)
const isUserRegistered = ClientFunction(username => {
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
        .expect(getPageUrl()).contains('/dashboard')

        .navigateTo(`${TEST_URL}/#/new-user`)
        .expect(getPageUrl()).contains('/new-user')
        .click('#backToUsersList')
        .expect(getPageUrl()).contains('/users-list')

        .navigateTo(`${TEST_URL}/#/new-user`)
        .expect(getPageUrl()).contains('/new-user')
        .click('#registerPerson')
        .expect(Selector('#personUserForm').exists).ok()
        .typeText('#username', 'testing')
        .expect(Selector('#username').value).eql('testing')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#password', 'testing')
        .expect(Selector('#password').value).eql('testing')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#email', 'testing@provider.com')
        .expect(Selector('#email').value).eql('testing@provider.com')
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
        .typeText('#name', 'testing')
        .expect(Selector('#name').value).eql('testing')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#cpf', '11111111111')
        .expect(Selector('#cpf').value).eql('111.111.111-11')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#birth', '15081988')
        .expect(Selector('#birth').value).eql('15/08/1988')
        .click('#save')
        .expect(Selector('#loading').exists).ok()
        // .expect(getPageUrl()).contains('users-list'')
        .expect(isUserRegistered('testing')).ok()

    //TODO: CADASTRO DE PESSOA JURÍDICA
    // .navigateTo(`${TEST_URL}/#/new-user`)
    // .expect(getPageUrl()).contains('/new-user')
    // .click('#registerCompany')
    // .expect(Selector('#companyUserForm').exists).ok()
})
