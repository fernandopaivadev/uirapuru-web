import { Selector, ClientFunction } from 'testcafe'
import { TEST_URL, TEST_LOGIN, TEST_PASSWORD } from '../../tests.env.json'

fixture('/dashboard').page(TEST_URL)

const getPageUrl = ClientFunction(() => window.location.href)
const goBack = ClientFunction(() => window.history.back())

test('Dashboard test', async t => {
    await t
        .typeText('#email', TEST_LOGIN)
        .expect(Selector('#email').value).eql(TEST_LOGIN)
        .typeText('#password', TEST_PASSWORD)
        .expect(Selector('#password').value).eql(TEST_PASSWORD)
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
