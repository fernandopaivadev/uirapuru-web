import { Selector, ClientFunction } from 'testcafe'

fixture('/dashboard').page(process.env.TEST_URL)

const getPageUrl = ClientFunction(() => window.location.href)
const goBack = ClientFunction(() => window.history.back())

test('eNavBar test', async t => {
    await t
        .typeText('#email', process.env.TEST_LOGIN)
        .typeText('#password', process.env.TEST_PASSWORD)
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
