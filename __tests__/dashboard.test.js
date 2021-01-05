import { Selector, ClientFunction } from 'testcafe'

fixture('/dashboard').page(process.env.TEST_URL)

const getPageUrl = ClientFunction(() => window.location.href)
const goBack = ClientFunction(() => window.history.back())

test('Dashboard test', async t => {
    await t
        .typeText('#email', process.env.TEST_LOGIN)
        .typeText('#password', process.env.TEST_PASSWORD)
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
