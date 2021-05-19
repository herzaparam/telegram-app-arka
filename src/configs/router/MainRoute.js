import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from './module/PrivateRoute'
import PublicRoute from './module/PublicRoute'

import { Login, Register, ForgotPassword, ChatRoom } from '../../pages/'

function App() {
    const portsocket = 'http://localhost:8000'
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const connectSocket = io(portsocket);
        setSocket(connectSocket);
    }, [])

    return (
        <Router >
            <Switch>
                <PublicRoute exact path="/" component={Login} />
                <PublicRoute path="/register" component={Register} />
                <PublicRoute path="/forgot-password" component={ForgotPassword} />
                <PrivateRoute path="/chat-room"><ChatRoom socket={socket}/></PrivateRoute>
            </Switch>
        </Router>
    )
}

export default App
