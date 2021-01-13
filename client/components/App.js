import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import PrivateRoute from './PrivateRoute'
import Navbar from './navbar/Navbar'
import Home from './Home'
import Register from './user/Register'
import Login from './user/Login'
import Notification from './Notification'
import Post from './post/Post'
import InputPostForm from './post/InputPostForm'
import Profile from './user/Profile'
import NotFound from './NotFound'

import { getLoggedUser } from '../store/userActions'

const AppView = ({ checkUserLogged }) => {
    useEffect(() => {
        checkUserLogged()
    }, [])

    return (
        <div className="app-container">
            <Navbar />
            <Notification />
            <main>
                <Switch>
                    <Route exact path = "/">
                        <Home />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path = "/login">
                        <Login />
                    </Route>
                    <Route path = "/create/post">
                        <PrivateRoute child = { InputPostForm } />
                    </Route>
                    <Route path = "/post/:title">
                        <Post />
                    </Route>
                    <Route path = "/profile/:id" component = { Profile } />
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </main>
        </div>
    )
}

const mapDispatch = dispatch => {
    return {
        checkUserLogged: () => {
            dispatch(getLoggedUser())
        }
    }
}

const App = connect(null, mapDispatch)(AppView)

export default App