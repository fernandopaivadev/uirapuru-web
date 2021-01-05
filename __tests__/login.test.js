import { Selector, ClientFunction } from 'testcafe'

fixture('/login').page(process.env.TEST_URL)

const getPageUrl = ClientFunction(() => window.location.href)

test('Login test', async t => {
    await t
        .typeText('#email', process.env.TEST_LOGIN)
        .typeText('#password', process.env.TEST_PASSWORD)
        .click('#button')
        .expect(Selector('#loading').exists).ok()
        .expect(getPageUrl()).contains('/dashboard')
})
