import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Login from './components/pages/Login'
import AdminLogin from './components/pages/AdminLogin'
import ForgotPassword from './components/pages/ForgotPassword'
import ResetPassword from './components/pages/ResetPassword'
import Dashboard from './components/pages/Dashboard'
import Profile from './components/pages/Profile'
import UsersList from './components/pages/UsersList'
import NewUser from './components/pages/NewUser'

const Routes = () => <Router>
    <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/admin/login' exact component={AdminLogin} />
        <Route path='/forgot-password' exact component={ForgotPassword} />
        <Route path='/reset-password' component={ResetPassword} />
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/profile' exact component={Profile} />
        <Route path='/users-list' exact component={UsersList} />
        <Route path='/new-user' exact component={NewUser} />
        <Redirect to='/login' />
    </Switch>
</Router>


export default Routes
