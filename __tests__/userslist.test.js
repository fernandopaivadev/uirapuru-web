import { Selector, ClientFunction } from 'testcafe'
import { TEST_URL, TEST_LOGIN, TEST_PASSWORD } from '../tests.env.json'

fixture('/users-lit').page(TEST_URL)

const getPageUrl = ClientFunction(() => window.location.href)
const goUsersList = ClientFunction(TEST_URL =>
    window.location.replace(`${TEST_URL}/#/users-list`)
)

test('UserList test', async t => {
    await t
        .typeText('#email', TEST_LOGIN)
        .typeText('#password', TEST_PASSWORD)
        .click('#button')
        .expect(Selector('#loading').exists).ok()
        .expect(getPageUrl()).contains('/dashboard')

    await goUsersList()

    await t
        .expect(getPageUrl()).contains('/users-list')
        .click('#buttonNewUser')
        .expect(getPageUrl()).contains('/new-user')

    await goUsersList()

    await t
        .expect(getPageUrl()).contains('/users-list')
        .click('#item0')
        .expect(getPageUrl()).contains('/dashboard')

    await goUsersList()

    await t
        .expect(getPageUrl()).contains('/users-list')
        .click('#buttonExit')
        .expect(getPageUrl()).contains('/login')
})
