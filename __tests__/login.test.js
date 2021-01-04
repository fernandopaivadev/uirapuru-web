import { Selector, ClientFunction } from 'testcafe'

fixture('/login').page('http://localhost:5000/#/login')

const getPageUrl = ClientFunction(() => window.location.href)

test('Login test', async t => {
    await t
        .typeText('#email', 'techamazon')
        .typeText('#password', 'TechAmazon2015')
        .click('#button')
        .expect(Selector('#loading').exists).ok()
        .expect(getPageUrl()).contains('/dashboard')
})
