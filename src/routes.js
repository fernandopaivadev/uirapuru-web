import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Login from './components/pages/Login'
import ForgotPassword from './components/pages/ForgotPassword'
import ResetPassword from './components/pages/ResetPassword'
import Dashboard from './components/pages/Dashboard'
import Plot from './components/pages/Plot'
import Profile from './components/pages/Profile'
import UsersList from './components/pages/UsersList'
import NewUser from './components/pages/NewUser'
import NewUnit from './components/pages/NewUnit'

import MobileProfile from './components/pages/MobileProfile'
import MobileDashboard from './components/pages/MobileDashboard'

const mobile = window.innerHeight > window.innerWidth

const Routes = () => {
    if (mobile) {
        return <Router>
            <Switch>
                <Route path='/login' exact component={Login} />
                <Route path='/forgot-password' exact component={ForgotPassword} />
                <Route path='/reset-password' component={ResetPassword} />
                <Route path='/dashboard' exact component={MobileDashboard} />
                <Route path='/profile' exact component={MobileProfile} />
                <Route path='/users-list' exact component={UsersList} />
                <Route path='/new-user' exact component={NewUser} />
                <Route path='/new-unit' exact component={NewUnit} />
                <Route path='/plot' exact component={Plot} />
                <Redirect to='/login' />
            </Switch>
        </Router>
    } else {
        return <Router>
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
    }
}

export default Routes
