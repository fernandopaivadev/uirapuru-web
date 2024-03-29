import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Login from './components/pages/Login/Login'
import ForgotPassword from './components/pages/ForgotPassword/ForgotPassword'
import ResetPassword from './components/pages/ResetPassword/ResetPassword'
import Dashboard from './components/pages/Dashboard/Dashboard'
import Plot from './components/pages/Plot/Plot'
import Profile from './components/pages/Profile/Profile'
import UsersList from './components/pages/UsersList/UsersList'
import NewUser from './components/pages/NewUser/NewUser'
import NewUnit from './components/pages/NewUnit/NewUnit'

const isMobile = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
].some(item => navigator.userAgent.match(item))

if (isMobile) {
    window.location.replace('https://m.techamazon.tech')
}

const Routes = () => <Router>
    <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/forgot-password' exact component={ForgotPassword} />
        <Route path='/reset-password' component={ResetPassword} />
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/plot' exact component={Plot} />
        <Route path='/profile' exact component={Profile} />
        <Route path='/users-list' exact component={UsersList} />
        <Route path='/new-user' exact component={NewUser} />
        <Route path='/new-unit' exact component={NewUnit} />
        <Redirect to='/login' />
    </Switch>
</Router>

export default Routes
