import { Selector, ClientFunction } from 'testcafe'

fixture('/users-lit').page('http://localhost:3000')

const getPageUrl = ClientFunction(() => window.location.href)
const goBack = ClientFunction(() => window.history.back())
const goUsersList = ClientFunction(() =>
    window.location.replace('http://localhost:3000/#/users-list')
)

test('UserList test', async t => {
    await t
        .typeText('#email', 'techamazon')
        .typeText('#password', 'TechAmazon2015')
        .click('#button')
        .expect(Selector('#loading').exists).ok()
        .expect(getPageUrl()).contains('/dashboard')

    await goUsersList()

    await t
        .expect(getPageUrl()).contains('/users-list')
        .click('#buttonNewUser')
        .expect(getPageUrl()).contains('/new-user')

    await goBack()

    await t
        .expect(getPageUrl()).contains('/users-list')
        .click('#item0')
        .expect(getPageUrl()).contains('/dashboard')

    await goBack()

    await t
        .expect(getPageUrl()).contains('/users-list')
        .click('#buttonExit')
        .expect(getPageUrl()).contains('/login')
})
