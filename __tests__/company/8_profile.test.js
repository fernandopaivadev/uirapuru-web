import { Selector, ClientFunction } from 'testcafe'
import { TEST_URL, TEST_LOGIN, TEST_PASSWORD } from '../../tests.env.json'

import storage from '../../src/services/storage'

fixture('/login').page(TEST_URL)

const getPageUrl = ClientFunction(() => window.location.href)
const isUserRegistered = ClientFunction((username, storage) => {
    const usersList = storage.read('users-list')

    const user = usersList.find(user => user.username === username)

    if (user) {
        return true
    } else {
        return false
    }
})
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

const renderingDelay = 1000
const loadingDelay = 15000

test('Profile test', async t => {
    await t
        //-LOGIN-----------------------------------------------------
        .typeText('#email', TEST_LOGIN)
        .expect(Selector('#email').value).eql(TEST_LOGIN)
        .typeText('#password', TEST_PASSWORD)
        .expect(Selector('#password').value).eql(TEST_PASSWORD)
        .click('#button')
        .expect(Selector('#loading').exists).ok()
        .wait(loadingDelay)
        .expect(getPageUrl()).contains('/dashboard')
        //-----------------------------------------------------------

        //-CRIA USUÁRIO A SER TESTADO--------------------------------
        .navigateTo(`${TEST_URL}/#/users-list`)
        .expect(getPageUrl()).contains('/users-list')
        .click('#buttonNewUser')
        .expect(getPageUrl()).contains('/new-user')
        .click('#registerCompany')
        .expect(Selector('#companyUserForm').exists).ok()
        .typeText('#username', 'usercompany')
        .expect(Selector('#username').value).eql('usercompany')
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#password', 'usercompany')
        .expect(Selector('#password').value).eql('usercompany')
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#email', 'usercompany@provider.com')
        .expect(Selector('#email').value).eql('usercompany@provider.com')
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#phone', '11111111111')
        .expect(Selector('#phone').value).eql('(11) 11111-1111')
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#errorMessage').exists).ok()
        .click('#accessLevel')
        .click(Selector('#accessLevel').find('option').withText('Administrador'))
        .expect(Selector('#accessLevel').value).eql('Administrador')
        .click('#accessLevel')
        .click(Selector('#accessLevel').find('option').withText('Usuário'))
        .expect(Selector('#accessLevel').value).eql('Usuário')
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#cnpj', '77777777777777')
        .expect(Selector('#cnpj').value).eql('77.777.777.7777-77')
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#name', 'testing')
        .expect(Selector('#name').value).eql('testing')
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#tradeName', 'testing')
        .expect(Selector('#tradeName').value).eql('testing')
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#errorMessage').exists).ok()
        .typeText(
            '#description',
            'testingnowtestingnowtestingnowtestingnowtestingnow'
        )
        .expect(Selector('#description').value).eql(
            'testingnowtestingnowtestingnowtestingnowtestingnow'
        )
        .click('#save')
        .wait(loadingDelay)
        .expect(getPageUrl()).contains('users-list')
        .expect(isUserRegistered('usercompany', storage)).ok()
        //-----------------------------------------------------------

        //-CLICA NO ÚLTIMO USUÁRIO CADASTRADO------------------------
        .wait(renderingDelay)
        .click('#item0')
        .expect(getPageUrl()).contains('/dashboard')
        .expect(Selector('#noUnit').exists).ok()
        .click('#newUnit')
        .expect(getPageUrl()).contains('/new-unit')
        //-----------------------------------------------------------


        //-NAVEGA PARA A PÁGINA /PROFILE-----------------------------
        .navigateTo(`${TEST_URL}/#/profile`)
        .expect(getPageUrl()).contains('/profile')
        .expect(Selector('#username').value).eql('usercompany')
        //-----------------------------------------------------------

        //-CRIA NOVA UNIDADE CONSUMIDORA-----------------------------
        .click('#newUnit')
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
        //------------------------------------------------------------

        //-CRIA NOVO DISPOSITIVO--------------------------------------
        .click('#newDevice')
        .expect(Selector('#newDeviceForm').exists).ok()
        .click('#saveDevice')
        .wait(renderingDelay)
        .expect(Selector('#errorMessageDevice').exists).ok()
        .typeText('#deviceId', '12345678')
        .expect(Selector('#deviceId').value).eql('12345678')
        .click('#saveDevice')
        .wait(renderingDelay)
        .expect(Selector('#errorMessageDevice').exists).ok()
        .click('#deviceId')
        .pressKey('ctrl+a delete')
        .expect(Selector('#deviceId').value).eql('')
        .typeText('#deviceName', 'testing')
        .expect(Selector('#deviceName').value).eql('testing')
        .click('#saveDevice')
        .wait(renderingDelay)
        .expect(Selector('#errorMessageDevice').exists).ok()
        .typeText('#deviceId', '12345678')
        .expect(Selector('#deviceId').value).eql('12345678')
        .click('#saveDevice')
        .wait(renderingDelay)
        .expect(Selector('#deviceForm0').exists).ok()
        //------------------------------------------------------------

        //-TESTA O BOTÃO 'DASHBOARD' DA PÁGINA /PROFILE---------------
        .click('#dashboard')
        .expect(getPageUrl()).contains('/dashboard')
        //-----------------------------------------------------------

        //-NAVEGA PARA A PÁGINA /PROFILE-----------------------------
        .click('#avatar')
        .expect(
            Selector('#profileMenu').getStyleProperty('opacity')
        ).eql('1')
        .click('#profileLink')
        .expect(getPageUrl()).contains('/profile')

        //-REALIZA OS TESTES DE VALIDAÇÃO DOS CAMPOS USUÁRIO---------
        .click('#username')
        .pressKey('ctrl+a delete')
        .expect(Selector('#username').value).eql('')
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#username', 'usercompany')
        .expect(Selector('#username').value).eql('usercompany')
        .click('#email')
        .pressKey('ctrl+a delete')
        .expect(Selector('#email').value).eql('')
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#email', 'usercompany@provider.com')
        .expect(Selector('#email').value).eql('usercompany@provider.com')
        .click('#phone')
        .pressKey('ctrl+a delete')
        .expect(Selector('#phone').value).eql('')
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#phone', '11111111111')
        .expect(Selector('#phone').value).eql('(11) 11111-1111')
        .click('#cnpj')
        .pressKey('ctrl+a delete')
        .expect(Selector('#cnpj').value).eql('')
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#cnpj', '64979879878979')
        .expect(Selector('#cnpj').value).eql('64.979.879.8789-79')
        .click('#name')
        .pressKey('ctrl+a delete')
        .expect(Selector('#name').value).eql('')
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#name', 'usercompany')
        .expect(Selector('#name').value).eql('usercompany')
        .click('#tradeName')
        .pressKey('ctrl+a delete')
        .expect(Selector('#tradeName').value).eql('')
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#tradeName', 'usercompany')
        .expect(Selector('#tradeName').value).eql('usercompany')
        .click('#description')
        .pressKey('ctrl+a delete')
        .expect(Selector('#description').value).eql('')
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#errorMessage').exists).ok()
        .typeText(
            '#description',
            'usercompanyusercompanyusercompanyusercompanyusercompanyusercompany'
        )
        .click('#save')
        .wait(renderingDelay)
        .expect(Selector('#successMessage').exists).ok()
        //------------------------------------------------------------

        //-REALIZA OS TESTES DE VALIDAÇÃO DOS CAMPOS UNIDADE----------
        .click('#number')
        .pressKey('ctrl+a delete')
        .expect(Selector('#number').value).eql('')
        .click('#saveUnit')
        .wait(renderingDelay)
        .expect(Selector('#errorMessageUnit').exists).ok()
        .typeText('#number', '1234567891011')
        .expect(Selector('#number').value).eql('1234567891011')
        .click('#unitName')
        .pressKey('ctrl+a delete')
        .expect(Selector('#unitName').value).eql('')
        .click('#saveUnit')
        .wait(renderingDelay)
        .expect(Selector('#errorMessageUnit').exists).ok()
        .typeText('#unitName', 'testunit')
        .expect(Selector('#unitName').value).eql('testunit')
        .click('#address')
        .pressKey('ctrl+a delete')
        .expect(Selector('#address').value).eql('')
        .click('#saveUnit')
        .wait(renderingDelay)
        .expect(Selector('#errorMessageUnit').exists).ok()
        .typeText('#address', 'testingnow')
        .expect(Selector('#address').value).eql('testingnow')
        .click('#zip')
        .pressKey('ctrl+a delete')
        .expect(Selector('#zip').value).eql('')
        .click('#saveUnit')
        .wait(renderingDelay)
        .expect(Selector('#errorMessageUnit').exists).ok()
        .typeText('#zip', '55555555')
        .expect(Selector('#zip').value).eql('55555-555')
        .click('#city')
        .pressKey('ctrl+a delete')
        .expect(Selector('#city').value).eql('')
        .click('#saveUnit')
        .wait(renderingDelay)
        .expect(Selector('#errorMessageUnit').exists).ok()
        .typeText('#city', 'testing')
        .expect(Selector('#city').value).eql('testing')
        .click('#state')
        .pressKey('ctrl+a delete')
        .expect(Selector('#state').value).eql('')
        .click('#saveUnit')
        .wait(renderingDelay)
        .expect(Selector('#errorMessageUnit').exists).ok()
        .typeText('#state', 'testing')
        .expect(Selector('#state').value).eql('testing')
        .click('#saveUnit')
        .wait(renderingDelay)
        .expect(Selector('#successMessageUnit').exists).ok()
        //-----------------------------------------------------------

        //-REALIZA OS TESTES DE VALIDAÇÃO DOS CAMPOS DISPOSITIVOS----
        .click('#deviceId0')
        .pressKey('ctrl+a delete')
        .expect(Selector('#deviceId0').value).eql('')
        .click('#saveDevicesList0')
        .wait(renderingDelay)
        .expect(Selector('#errorMessageDevicesList').exists).ok()
        .typeText('#deviceId0', '12345678')
        .expect(Selector('#deviceId0').value).eql('12345678')
        .click('#deviceName0')
        .pressKey('ctrl+a delete')
        .expect(Selector('#deviceName0').value).eql('')
        .click('#saveDevicesList0')
        .wait(renderingDelay)
        .expect(Selector('#errorMessageDevicesList').exists).ok()
        .typeText('#deviceName0', 'testing')
        .expect(Selector('#deviceName0').value).eql('testing')
        .click('#saveDevicesList0')
        .wait(renderingDelay)
        .expect(Selector('#successMessageDevicesList').exists).ok()
        //----------------------------------------------------------

        //-NAVEGA PARA DASHBOARD E TESTA
        .click('#dashboard')
        .expect(getPageUrl()).contains('/dashboard')
        .click('#deviceIcon0')
        .expect(getPageUrl()).contains('/plot')
        .click('#subItem0')
        .expect(getPageUrl()).contains('/plot')

        //-REALIZA TESTE DE REMOÇÃO DEVICE--------------------------
        .navigateTo(`${TEST_URL}/#/profile`)
        .expect(getPageUrl()).contains('/profile')
        .click('#deleteDevicesList0')
        .click('#no')
        .expect(Selector('#deviceForm0').exists).ok()
        .click('#deleteDevicesList0')
        .click('#yes')
        .expect(Selector('#deviceForm0').exists).notOk()
        //----------------------------------------------------------

        //-REALIZA TESTE DO BOTÃO NOVA UNIDADE-----------------------
        .click('#newUnit')
        .expect(getPageUrl()).contains('/new-unit')
        .navigateTo(`${TEST_URL}/#/profile`)
        .expect(getPageUrl()).contains('/profile')
        //----------------------------------------------------------

        //-REALIZA TESTE DE REMOÇÃO UNIT----------------------------
        .click('#deleteUnit')
        .click('#no')
        .expect(Selector('#consumerUnitForm').exists).ok()
        .click('#deleteUnit')
        .click('#yes')
        .expect(Selector('#consumerUnitForm').exists).notOk()
        //----------------------------------------------------------

        //-REALIZA TESTE DE REMOÇÃO DO USUÁRIO----------------------
        .click('#deleteUser')
        .click('#no')
        .expect(Selector('#userForm').exists).ok()
        .click('#deleteUser')
        .click('#yes')
        .wait(loadingDelay)
        .expect(getPageUrl()).contains('/users-list')
        .expect(isUserRegistered('usercompany', storage)).notOk()
        //-----------------------------------------------------------

        //-REALIZA TESTE DO BOTÃO 'SAIR'-----------------------------
        .click('#exit')
        .wait(renderingDelay)
        .expect(getPageUrl()).contains('/login')
        //-----------------------------------------------------------
})