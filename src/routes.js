import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Login from './components/pages/Login'
import AdminLogin from './components/pages/AdminLogin'
import ForgotPassword from './components/pages/ForgotPassword'
import ResetPassword from './components/pages/ResetPassword'
import Fetch from './components/functions/Fetch'
import Dashboard from './components/pages/Dashboard'
import Settings from './components/pages/Settings'

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/admin/login" exact component={AdminLogin} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/loading" exact component={Fetch} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/settings" exact component={Settings} />
            <Redirect to="/loading" />
        </Switch>
    </Router>
)

export default Routes
