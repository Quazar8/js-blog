import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Navbar from './Navbar'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Notification from './Notification'
import PostForm from './PostForm'
import Post from './Post'

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
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/create/post">
                        <PostForm />
                    </Route>
                    <Route path="/post/:title">
                        <Post />
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