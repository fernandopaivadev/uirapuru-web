import { Selector } from 'testcafe'

fixture `Getting Started`
    .page `http://localhost:3000/#/login`

test('Login test', async t => {
    await t
        .typeText('#email', 'techamazon')
        .typeText('#password', 'TechAmazon2015')
        .click('button')
})