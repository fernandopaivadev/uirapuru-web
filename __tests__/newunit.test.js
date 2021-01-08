import { Selector, ClientFunction } from 'testcafe'
import { TEST_URL, TEST_LOGIN_1, TEST_PASSWORD_1 } from '../tests.env.json'

fixture('/new-unit').page(TEST_URL)

const getPageUrl = ClientFunction(() => window.location.href)
const goNewUnit = ClientFunction(TEST_URL =>
    window.location.replace(`${TEST_URL}/#/new-unit`)
)

test('NewUser test', async t => {
    await t
        .typeText('#email', TEST_LOGIN_1)
        .expect(Selector('#email').value).eql(TEST_LOGIN_1)
        .typeText('#password',TEST_PASSWORD_1)
        .expect(Selector('#password').value).eql(TEST_PASSWORD_1)
        .click('#button')
        .expect(Selector('#loading').exists).ok()
        .expect(getPageUrl()).contains('/dashboard')

    await goNewUnit()

    await t
        .expect(getPageUrl()).contains('/new-unit')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#number', '123456')
        .expect(Selector('#number').value).eql('123456')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#name', 'testing')
        .expect(Selector('#name').value).eql('testing')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#address', 'testing')
        .expect(Selector('#address').value).eql('testing')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#zip', '11111111')
        .expect(Selector('#zip').value).eql('11111-111')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#city', 'testing')
        .expect(Selector('#city').value).eql('testing')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#state', 'testing')
        .expect(Selector('#state').value).eql('testing')
        .click('#save')
        .expect(getPageUrl()).contains('/profile')

    await goNewUnit()

    await t
        .expect(getPageUrl()).contains('/new-unit')
        .click('#back')
        .expect(getPageUrl()).contains('/profile')


})
