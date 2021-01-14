import { Selector, ClientFunction } from 'testcafe'
import { TEST_URL, TEST_LOGIN, TEST_PASSWORD } from '../../tests.env.json'

import storage from '../../src/services/storage'

fixture('/new-unit').page(TEST_URL)

const getPageUrl = ClientFunction(() => window.location.href)

const isConsumerUnitRegistered = ClientFunction((storage, number) => {
    const user = storage.read('user')

    const consumerUnit = user.consumerUnits.find(consumerUnit =>
        consumerUnit.number === number
    )

    if (consumerUnit) {
        return true
    } else {
        return false
    }
})

test('NewUnit test', async t => {
    await t
        .typeText('#email', TEST_LOGIN)
        .expect(Selector('#email').value).eql(TEST_LOGIN)
        .typeText('#password',TEST_PASSWORD)
        .expect(Selector('#password').value).eql(TEST_PASSWORD)
        .click('#button')
        .expect(Selector('#loading').exists).ok()
        .wait(10000)
        .expect(getPageUrl()).contains('/dashboard')

        .navigateTo(`${TEST_URL}/#/new-unit`)
        .expect(getPageUrl()).contains('/new-unit')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#number', '123456')
        .expect(Selector('#number').value).eql('123456')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#name', 'testing')
        .expect(Selector('#name').value).eql('testing')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#address', 'testing')
        .expect(Selector('#address').value).eql('testing')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#zip', '11111111')
        .expect(Selector('#zip').value).eql('11111-111')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#city', 'testing')
        .expect(Selector('#city').value).eql('testing')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#state', 'testing')
        .expect(Selector('#state').value).eql('testing')
        .click('#save')
        .expect(getPageUrl()).contains('/profile')

        .navigateTo(`${TEST_URL}/#/new-unit`)
        .expect(getPageUrl()).contains('/new-unit')
        .click('#back')
        .expect(getPageUrl()).contains('/profile')

        .expect(isConsumerUnitRegistered(storage, '123456')).ok()
})
