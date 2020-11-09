import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Home from './Home'
import Register from './Register'

const App = () => {
    return (
        <div className="app-container">
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </div>
    )
}

export default App