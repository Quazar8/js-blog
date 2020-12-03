import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Notification from './Notification'
import PostForm from './PostForm'
import Post from './Post'

const App = () => {
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
                    <Route path="/post/:title"
                     render={
                         (props) => <Post post = { props.location.post } />
                     }
                    />
                </Switch>
            </main>
        </div>
    )
}

export default App