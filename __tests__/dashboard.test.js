import { Selector, ClientFunction } from 'testcafe'

fixture('/dashboard').page('http://localhost:3000')

const getPageUrl = ClientFunction(() => window.location.href)
const goBack = ClientFunction(() => window.history.back())

test('Dashboard test', async t => {
    await t
        .typeText('#email', 'techamazon')
        .typeText('#password', 'TechAmazon2015')
        .click('#button')
        .expect(Selector('#loading').exists).ok()
        .expect(getPageUrl()).contains('/dashboard')
        .click('#subItem0')
        .expect(getPageUrl()).contains('/plot')

    await goBack()

    await t
        .expect(getPageUrl()).contains('/dashboard')
        .click('#deviceIcon0')
        .expect(getPageUrl()).contains('/plot')
})
