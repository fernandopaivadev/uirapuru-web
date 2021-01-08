import { Selector, ClientFunction } from 'testcafe'
import { TEST_URL, TEST_LOGIN, TEST_PASSWORD } from '../tests.env.json'

<<<<<<< HEAD
fixture('/login').page(TEST_URL)
=======
fixture('/login').page('http://localhost:5000/#/login')
>>>>>>> develop

const getPageUrl = ClientFunction(() => window.location.href)

test('Login test', async t => {
    await t
        .typeText('#email', TEST_LOGIN)
        .typeText('#password', TEST_PASSWORD)
        .click('#button')
        .expect(Selector('#loading').exists).ok()
        .expect(getPageUrl()).contains('/dashboard')
})
