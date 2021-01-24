import { Selector, ClientFunction } from 'testcafe'
import { TEST_URL, TEST_LOGIN, TEST_PASSWORD } from '../../../tests.env.json'

import storage from '../../../src/services/storage'

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

test('Admin Level Person User Test', async t => {
    await t
        //-LOGIN----------------------------------------------------------------
        .typeText('#email', TEST_LOGIN)
        .expect(Selector('#email').value).eql(TEST_LOGIN)
        .typeText('#password', TEST_PASSWORD)
        .expect(Selector('#password').value).eql(TEST_PASSWORD)
        .click('#button')
        .expect(Selector('#loading').exists).ok()
        .wait(20000)
        .expect(getPageUrl()).contains('/dashboard')
        //----------------------------------------------------------------------

        //-TESTA BOTÃO DE VOLTAR NA USERS-LIST----------------------------------
        .navigateTo(`${TEST_URL}/#/new-user`)
        .expect(getPageUrl()).contains('/new-user')
        .click('#backToUsersList')
        .expect(getPageUrl()).contains('/users-list')
        //----------------------------------------------------------------------

        //-CRIA USUÁRIO A SER TESTADO-------------------------------------------
        .navigateTo(`${TEST_URL}/#/new-user`)
        .expect(getPageUrl()).contains('/new-user')
        .click('#registerPerson')
        .expect(Selector('#personUserForm').exists).ok()
        .typeText('#username', 'userperson')
        .expect(Selector('#username').value).eql('userperson')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#password', 'userperson')
        .expect(Selector('#password').value).eql('userperson')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#email', 'userperson@provider.com')
        .expect(Selector('#email').value).eql('userperson@provider.com')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#phone', '11111111111')
        .expect(Selector('#phone').value).eql('(11) 11111-1111')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .click('#accessLevel')
        .click(Selector('#accessLevel').find('option').withText('Administrador'))
        .expect(Selector('#accessLevel').value).eql('Administrador')
        .click('#accessLevel')
        .click(Selector('#accessLevel').find('option').withText('Usuário'))
        .expect(Selector('#accessLevel').value).eql('Usuário')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#name', 'testing')
        .expect(Selector('#name').value).eql('testing')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#cpf', '11111111111')
        .expect(Selector('#cpf').value).eql('111.111.111-11')
        .click('#save')
        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#birth', '15081988')
        .expect(Selector('#birth').value).eql('15/08/1988')
        .click('#save')
        .expect(Selector('#loading').exists).ok()
        .wait(10000)
        .expect(getPageUrl()).contains('users-list')
        .expect(isUserRegistered('userperson', storage)).ok()
        //----------------------------------------------------------------------

        //-ACESSA O USUÁRIO RECÉM CADASTRADO NA USERS LIST----------------------
        .click('#item0')
        //----------------------------------------------------------------------

        //-VERIFICA O BOTÃO DE NOVA UNIDADE CONSUMIDORA NA DASHBOARD------------
        .expect(getPageUrl()).contains('/dashboard')
        .expect(Selector('#noUnit').exists).ok()
        .click('#newUnit')
        .expect(getPageUrl()).contains('/new-unit')
        //----------------------------------------------------------------------

        //-NAVEGA PARA A PÁGINA PROFILE E VERIFICA O USUÁRIO--------------------
        .navigateTo(`${TEST_URL}/#/profile`)
        .expect(getPageUrl()).contains('/profile')
        .expect(Selector('#username').value).eql('userperson')
        //----------------------------------------------------------------------

        //-CRIA NOVA UNIDADE CONSUMIDORA----------------------------------------
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
        //----------------------------------------------------------------------

        //-VERIFICA SE OCORREU O REDIRECIONAMENTO-------------------------------
        .expect(getPageUrl()).contains('/profile')
        //----------------------------------------------------------------------

        //-VERIFICA O BOTÃO DE VOLTAR NA NEW UNIT-------------------------------
        .navigateTo(`${TEST_URL}/#/new-unit`)
        .expect(getPageUrl()).contains('/new-unit')
        .click('#back')
        .expect(getPageUrl()).contains('/profile')
        //----------------------------------------------------------------------

        //-VERIFICA SE O CADASTRO FOI BEM SUCEDIDO------------------------------
        .expect(isConsumerUnitRegistered(storage, '123456')).ok()
        //----------------------------------------------------------------------

        //-CRIA NOVO DISPOSITIVO------------------------------------------------
        .click('#newDevice')
        .expect(Selector('#newDeviceForm').exists).ok()
        .click('#saveDevice')

        .expect(Selector('#errorMessageDevice').exists).ok()
        .typeText('#deviceId', '2N042CDF')
        .expect(Selector('#deviceId').value).eql('2N042CDF')
        .click('#saveDevice')

        .expect(Selector('#errorMessageDevice').exists).ok()
        .click('#deviceId')
        .pressKey('ctrl+a delete')
        .expect(Selector('#deviceId').value).eql('')
        .typeText('#deviceName', 'testing')
        .expect(Selector('#deviceName').value).eql('testing')
        .click('#saveDevice')

        .expect(Selector('#errorMessageDevice').exists).ok()
        .typeText('#deviceId', '2N042CDF')
        .expect(Selector('#deviceId').value).eql('2N042CDF')
        .click('#saveDevice')

        .expect(Selector('#deviceForm0').exists).ok()
        //----------------------------------------------------------------------

        //-VERIFICA O BOTÃO DASHBOARD NA PROFILE--------------------------------
        .click('#dashboard')
        .expect(getPageUrl()).contains('/dashboard')
        //----------------------------------------------------------------------

        //-NAVEGA PARA A PROFILE USANDO O MENU DA NAVBAR------------------------
        .click('#avatar')
        .expect(
            Selector('#profileMenu').getStyleProperty('opacity')
        ).eql('1')
        .click('#profileLink')
        .expect(getPageUrl()).contains('/profile')
        //----------------------------------------------------------------------

        //-REALIZA OS TESTES DE VALIDAÇÃO DOS CAMPOS USUÁRIO--------------------
        .click('#username')
        .pressKey('ctrl+a delete')
        .expect(Selector('#username').value).eql('')
        .click('#save')

        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#username', 'userperson')
        .expect(Selector('#username').value).eql('userperson')
        .click('#email')
        .pressKey('ctrl+a delete')
        .expect(Selector('#email').value).eql('')
        .click('#save')

        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#email', 'userperson@provider.com')
        .expect(Selector('#email').value).eql('userperson@provider.com')
        .click('#phone')
        .pressKey('ctrl+a delete')
        .expect(Selector('#phone').value).eql('')
        .click('#save')

        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#phone', '11111111111')
        .expect(Selector('#phone').value).eql('(11) 11111-1111')
        .click('#name')
        .pressKey('ctrl+a delete')
        .expect(Selector('#name').value).eql('')
        .click('#save')

        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#name', 'testing')
        .expect(Selector('#name').value).eql('testing')
        .click('#cpf')
        .pressKey('ctrl+a delete')
        .expect(Selector('#cpf').value).eql('')
        .click('#save')

        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#cpf', '11111111111')
        .expect(Selector('#cpf').value).eql('111.111.111-11')
        .click('#birth')
        .pressKey('ctrl+a delete')
        .expect(Selector('#birth').value).eql('')
        .click('#save')

        .expect(Selector('#errorMessage').exists).ok()
        .typeText('#birth', '15081988')
        .expect(Selector('#birth').value).eql('15/08/1988')
        .click('#save')

        .expect(Selector('#successMessage').exists).ok()
        //----------------------------------------------------------------------

        //-REALIZA OS TESTES DE VALIDAÇÃO DOS CAMPOS UNIDADE--------------------
        .click('#number')
        .pressKey('ctrl+a delete')
        .expect(Selector('#number').value).eql('')
        .click('#saveUnit')

        .expect(Selector('#errorMessageUnit').exists).ok()
        .typeText('#number', '1234567891011')
        .expect(Selector('#number').value).eql('1234567891011')
        .click('#unitName')
        .pressKey('ctrl+a delete')
        .expect(Selector('#unitName').value).eql('')
        .click('#saveUnit')

        .expect(Selector('#errorMessageUnit').exists).ok()
        .typeText('#unitName', 'testunit')
        .expect(Selector('#unitName').value).eql('testunit')
        .click('#address')
        .pressKey('ctrl+a delete')
        .expect(Selector('#address').value).eql('')
        .click('#saveUnit')

        .expect(Selector('#errorMessageUnit').exists).ok()
        .typeText('#address', 'testingnow')
        .expect(Selector('#address').value).eql('testingnow')
        .click('#zip')
        .pressKey('ctrl+a delete')
        .expect(Selector('#zip').value).eql('')
        .click('#saveUnit')

        .expect(Selector('#errorMessageUnit').exists).ok()
        .typeText('#zip', '55555555')
        .expect(Selector('#zip').value).eql('55555-555')
        .click('#city')
        .pressKey('ctrl+a delete')
        .expect(Selector('#city').value).eql('')
        .click('#saveUnit')

        .expect(Selector('#errorMessageUnit').exists).ok()
        .typeText('#city', 'testing')
        .expect(Selector('#city').value).eql('testing')
        .click('#state')
        .pressKey('ctrl+a delete')
        .expect(Selector('#state').value).eql('')
        .click('#saveUnit')

        .expect(Selector('#errorMessageUnit').exists).ok()
        .typeText('#state', 'testing')
        .expect(Selector('#state').value).eql('testing')
        .click('#saveUnit')

        .expect(Selector('#successMessageUnit').exists).ok()
        //----------------------------------------------------------------------

        //-REALIZA OS TESTES DE VALIDAÇÃO DOS CAMPOS DISPOSITIVOS---------------
        .click('#deviceId0')
        .pressKey('ctrl+a delete')
        .expect(Selector('#deviceId0').value).eql('')
        .click('#saveDevicesList0')

        .expect(Selector('#errorMessageDevicesList').exists).ok()
        .typeText('#deviceId0', '12345678')
        .expect(Selector('#deviceId0').value).eql('12345678')
        .click('#deviceName0')
        .pressKey('ctrl+a delete')
        .expect(Selector('#deviceName0').value).eql('')
        .click('#saveDevicesList0')

        .expect(Selector('#errorMessageDevicesList').exists).ok()
        .typeText('#deviceName0', 'testing')
        .expect(Selector('#deviceName0').value).eql('testing')
        .click('#saveDevicesList0')

        .expect(Selector('#successMessageDevicesList').exists).ok()
        //----------------------------------------------------------------------

        //-NAVEGA PARA DASHBOARD E VERIFICA O MENU E ÍCONES DE PAINEL-----------
        .click('#dashboard')
        .expect(getPageUrl()).contains('/dashboard')
        .click('#deviceIcon0')
        .expect(getPageUrl()).contains('/plot')
        .click('#subItem0')
        .expect(getPageUrl()).contains('/plot')
        //----------------------------------------------------------------------

        //-TESTE DO PLOT -------------------------------------------------------
        .typeText('#datePicker', '2020-12-12')
        .expect(Selector('#datePicker').value).eql('2020-12-12')
        .click('#search')
        .expect(Selector('#chart').exists).ok()
        .click('#period')
        .click(Selector('#period').find('option').withText('12'))
        .expect(Selector('#period').value).eql('12h')
        .typeText('#hour', '06:00')
        .expect(Selector('#hour').value).eql('06:00')
        .click('#search')
        .expect(Selector('#chart').exists).ok()
        .typeText('#datePicker', '2020-12-12')
        .click('#backIcon')
        .expect(Selector('#datePicker').value).eql('2020-12-11')
        .click('#search')
        .expect(Selector('#chart').exists).ok()
        .click('#forwardIcon')
        .expect(Selector('#datePicker').value).eql('2020-12-12')
        .click('#search')
        .expect(Selector('#chart').exists).ok()
        .click('#export')
        //----------------------------------------------------------------------

        //-REMOVE DISPOSITIVO---------------------------------------------------
        .navigateTo(`${TEST_URL}/#/profile`)
        .expect(getPageUrl()).contains('/profile')
        .click('#deleteDevicesList0')
        .click('#no')
        .expect(Selector('#deviceForm0').exists).ok()
        .click('#deleteDevicesList0')
        .click('#yes')
        .expect(Selector('#deviceForm0').exists).notOk()
        //----------------------------------------------------------------------

        //-VERIFICA O BOTÃO DE NOVA UNIDADE NA PROFILE--------------------------
        .click('#newUnit')
        .expect(getPageUrl()).contains('/new-unit')
        .navigateTo(`${TEST_URL}/#/profile`)
        .expect(getPageUrl()).contains('/profile')
        //----------------------------------------------------------------------

        //-REMOVE UNIDADE CONSUMIDORA-------------------------------------------
        .click('#deleteUnit')
        .click('#no')
        .expect(Selector('#consumerUnitForm').exists).ok()
        .click('#deleteUnit')
        .click('#yes')
        .expect(Selector('#consumerUnitForm').exists).notOk()
        //----------------------------------------------------------------------

        //-REMOVE USUÁRIO-------------------------------------------------------
        .click('#deleteUser')
        .click('#no')
        .expect(Selector('#userForm').exists).ok()
        .click('#deleteUser')
        .click('#yes')

        .expect(getPageUrl()).contains('/users-list')
        .expect(isUserRegistered('userperson', storage)).notOk()
        //----------------------------------------------------------------------

        //-VERIFICA O BOTÃO SAIR NA USERS LIST----------------------------------
        .click('#exit')

        .expect(getPageUrl()).contains('/login')
        //----------------------------------------------------------------------
})