import { Selector, ClientFunction } from 'testcafe'
import { TEST_URL, TEST_LOGIN, TEST_PASSWORD } from '../tests.env.json'

fixture('/dashboard').page(TEST_URL)

const getPageUrl = ClientFunction(() => window.location.href)
const goBack = ClientFunction(() => window.history.back())

test('NavBar test', async t => {
    await t
        .typeText('#email', TEST_LOGIN)
        .expect(Selector('#email').value).eql(TEST_LOGIN)
        .typeText('#password', TEST_PASSWORD)
        .expect(Selector('#password').value).eql(TEST_PASSWORD)
        .click('#button')
        .expect(Selector('#loading').exists).ok()
        .expect(getPageUrl()).contains('/dashboard')
        .click('#avatar')
        .expect(
            Selector('#profileMenu').getStyleProperty('opacity')
        ).eql('1')
        .click('#usersListLink')
        .expect(getPageUrl()).contains('/users-list')

    await goBack()

    await t
        .expect(getPageUrl()).contains('/dashboard')
        .click('#avatar')
        .expect(
            Selector('#profileMenu').getStyleProperty('opacity')
        ).eql('1')
        .click('#profileLink')
        .expect(getPageUrl()).contains('/profile')
        .click('#avatar')
        .expect(
            Selector('#profileMenu').getStyleProperty('opacity')
        ).eql('1')
        .click('#dashboardLink')
        .expect(getPageUrl()).contains('/dashboard')
        .click('#avatar')
        .expect(
            Selector('#profileMenu').getStyleProperty('opacity')
        ).eql('1')
        .click('#exitLink')
        .expect(getPageUrl()).contains('/login')
})
