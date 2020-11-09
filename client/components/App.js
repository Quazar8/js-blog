import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Home from './Home'
import Register from './Register'
import Login from './Login'

const App = () => {
    return (
        <div className="app-container">
            <Navbar />
            <main>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </main>
        </div>
    )
}

export default App