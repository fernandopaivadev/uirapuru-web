import { Selector, ClientFunction } from 'testcafe'
import { TEST_URL, TEST_LOGIN_1, TEST_PASSWORD_1 } from '../../tests.env.json'

fixture('/login').page(TEST_URL)

const getPageUrl = ClientFunction(() => window.location.href)

test('User Level Person/Company User Test', async t => {
    await t
        //-LOGIN----------------------------------------------------------------
        .typeText('#email', TEST_LOGIN_1)
        .expect(Selector('#email').value).eql(TEST_LOGIN_1)
        .typeText('#password', TEST_PASSWORD_1)
        .expect(Selector('#password').value).eql(TEST_PASSWORD_1)
        .click('#button')
        .expect(Selector('#loading').exists).ok()
        .expect(getPageUrl()).contains('/dashboard')
        //----------------------------------------------------------------------

        //-TESTA ÍCONE DO DISPOSITIVO-------------------------------------------
        .click('#deviceIcon0')
        .expect(getPageUrl()).contains('/plot')
        //----------------------------------------------------------------------

        //-TESTA BOTÃO DASHBOARD NA PLOT----------------------------------------
        .click('#dashboard')
        .expect(getPageUrl()).contains('dashboard')
        //----------------------------------------------------------------------

        //-TESTA CLICAR NO DISPOSITIVO PELO MENU--------------------------------
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

        //-TESTA NAVEGAR PARA A DASHBOARD USANDO O MENUPROFILE------------------
        .click('#avatar')
        .expect(
            Selector('#profileMenu').getStyleProperty('opacity')
        ).eql('1')
        .click('#dashboardLink')
        .expect(getPageUrl()).contains('/dashboard')
        //----------------------------------------------------------------------

        //-TESTA NAVEGAR PARA A PROFILE  USANDO O MENUPROFILE-------------------
        .click('#avatar')
        .expect(
            Selector('#profileMenu').getStyleProperty('opacity')
        ).eql('1')
        .click('#profileLink')
        .expect(getPageUrl()).contains('/profile')
        //----------------------------------------------------------------------

        //-TESTA EXISTÊNCIA DOS FORMULÁRIOS-------------------------------------
        .expect(Selector('#userForm').exists).ok()
        .expect(Selector('#consumerUnitForm').exists).ok()
        .expect(Selector('#deviceForm0').exists).ok()
        //----------------------------------------------------------------------

        //-TESTA BOTÃO DASHBOARD NA PROFILE-------------------------------------
        .click('#dashboard')
        .expect(getPageUrl()).contains('/dashboard')
        //----------------------------------------------------------------------

        //-TESTA LOGOUT---------------------------------------------------------
        .click('#avatar')
        .expect(
            Selector('#profileMenu').getStyleProperty('opacity')
        ).eql('1')
        .click('#exitLink')
        .expect(getPageUrl()).contains('/login')
        //----------------------------------------------------------------------
})