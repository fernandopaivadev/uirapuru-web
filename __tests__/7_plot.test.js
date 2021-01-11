import { Selector, ClientFunction } from 'testcafe'
import { TEST_URL, TEST_LOGIN, TEST_PASSWORD } from '../tests.env.json'

fixture('/plot').page(TEST_URL)

const getPageUrl = ClientFunction(() => window.location.href)
const goPlot = ClientFunction(TEST_URL =>
    window.location
        .replace(`${TEST_URL}/#/plot?consumerUnitIndex=0&deviceIndex=1`)
)

test('Plot test', async t => {
    await t
        .typeText('#email', TEST_LOGIN)
        .expect(Selector('#email').value).eql(TEST_LOGIN)
        .typeText('#password', TEST_PASSWORD)
        .expect(Selector('#password').value).eql(TEST_PASSWORD)
        .click('#button')
        .expect(Selector('#loading').exists).ok()
        .expect(getPageUrl()).contains('/dashboard')

    await goPlot()

    await t
        .expect(getPageUrl()).contains('/plot')
        .click('#dashboard')
        .expect(getPageUrl()).contains('/dashboard')

    await goPlot()

    await t
        .expect(getPageUrl()).contains('/plot')
        .typeText('#datePicker', '2020-12-12')
        .expect(Selector('#datePicker').value).eql('2020-12-12')
        .expect(Selector('#chart').exists).ok()
        .click('#period')
        .click(Selector('#period').find('option').withText('12'))
        .expect(Selector('#period').value).eql('12h')
        .typeText('#hour', '06:00')
        .expect(Selector('#hour').value).eql('06:00')
        .expect(Selector('#chart').exists).ok()

    await t
        .expect(getPageUrl()).contains('/plot')
        .typeText('#datePicker', '2020-12-12')
        .click('#backIcon')
        .expect(Selector('#datePicker').value).eql('2020-12-11')
        .expect(Selector('#chart').exists).ok()
        .click('#forwardIcon')
        .expect(Selector('#datePicker').value).eql('2020-12-12')
        .expect(Selector('#chart').exists).ok()
        .click('#export')


    await t
        .click('#subItem0')
        .expect(getPageUrl()).contains('/plot')

})
