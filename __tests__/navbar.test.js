import { Selector, ClientFunction } from 'testcafe'

fixture('/dashboard').page('http://localhost:3000')

const getPageUrl = ClientFunction(() => window.location.href)
const goBack = ClientFunction(() => window.history.back())

test('eNavBar test', async t => {
    await t
        .typeText('#email', 'techamazon')
        .typeText('#password', 'TechAmazon2015')
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
