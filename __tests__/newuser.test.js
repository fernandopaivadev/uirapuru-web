import { Selector, ClientFunction } from 'testcafe'
import { TEST_URL, TEST_LOGIN, TEST_PASSWORD } from '../tests.env.json'

fixture('/new-user').page(TEST_URL)

const getPageUrl = ClientFunction(() => window.location.href)
const goNewUser = ClientFunction(TEST_URL =>
    window.location.replace(`${TEST_URL}/#/new-user`)
)

test('NewUser test', async t => {
    await t
        .typeText('#email', TEST_LOGIN)
        .typeText('#password',TEST_PASSWORD)
        .click('#button')
        .expect(Selector('#loading').exists).ok()
        .expect(getPageUrl()).contains('/dashboard')

    await goNewUser()

    await t
        .click('#back')
        .expect(getPageUrl()).contains('/users-list')

    await goNewUser()

    await t
        .expect(getPageUrl()).contains('/new-user')
        .typeText('#usernameInput', 'testing')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#passwordInput', 'testing')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#emailInput', 'testing@gmail.com')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#phoneInput', '11111111111')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .click('#accessLevelSelect')
        .click(Selector('#accessLevelSelect').find('option').withText('Administrador'))
        .expect(Selector('#accessLevelSelect').value).eql('Administrador')
        .click('#accessLevelSelect')
        .click(Selector('#accessLevelSelect').find('option').withText('Usuário'))
        .click('#save')
        .expect(Selector('#accessLevelSelect').value).eql('Usuário')
        .typeText('#cnpjInput', '54784236198214')
        .expect(Selector('#cnpjInput').value).eql('54.784.236.1982-14')
        .typeText('#nameInput', 'testing')
        .expect(Selector('#nameInput').value).eql('testing')
        .typeText('#tradeNameInput', 'testing')
        .expect(Selector('#tradeNameInput').value).eql('testing')
        .typeText(
            '#descriptionInput',
            'testingnowtestingnowtestingnowtestingnowtestingnow'
        )
        .click('#save')
        .expect(Selector('#loading').exists).ok()
        .expect(getPageUrl()).contains('/users-list')

})
