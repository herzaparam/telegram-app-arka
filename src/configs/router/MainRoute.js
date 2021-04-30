import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { SplashScreen, Login, Register, ForgotPassword, Chat } from '../../pages/'

function App() {
    return (
        <Router >
            <Switch>
                <Route exact path="/" component={SplashScreen} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/chat" component={Chat} />
            </Switch>
        </Router>
    )
}

export default App
