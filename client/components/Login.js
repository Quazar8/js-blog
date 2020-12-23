import React, { createRef } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../store/userActions'

const LoginView = ({ tryLogIn }) => {
    let usernameRef = createRef()
    let passwordRef = createRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        tryLogIn(data)
    }    

    return (
        <form className = "user-forms" onSubmit={ handleSubmit }>
            <h2>Login:</h2>
            <div className="field-container">
                <label htmlFor="username">Username:</label>
                <input id="username" type="text"
                    ref = { usernameRef }
                    autoFocus
                    autoComplete = "off"
                 />
            </div>
            <div className="field-container">
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" 
                    ref = { passwordRef }
                />
            </div>
            <input type="submit" value="Sign In" />
        </form>
    )
}

const mapDispatch = dispatch => ({
    tryLogIn: (data) => {
        dispatch(loginUser(data))
    }
})

const Login = connect(null, mapDispatch)(LoginView)

export default Login