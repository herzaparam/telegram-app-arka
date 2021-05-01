import React from 'react'
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from './module/PrivateRoute'
import PublicRoute from './module/PublicRoute'

import { Login, Register, ForgotPassword, Chat, ChatRoom } from '../../pages/'

function App() {
    return (
        <Router >
            <Switch>
                <PublicRoute exact path="/" component={Login} />
                <PublicRoute path="/register" component={Register} />
                <PublicRoute path="/forgot-password" component={ForgotPassword} />
                <PrivateRoute path="/chat" component={Chat} />
                <PrivateRoute path="/chat-room" component={ChatRoom} />
            </Switch>
        </Router>
    )
}

export default App
