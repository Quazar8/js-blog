import React, { createRef } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../store/userActions'

import Arrow from './svgs/Arrow'

const LoginView = ({ tryLogIn }) => {
    let usernameRef = createRef()
    let passwordRef = createRef()

    const submitForm = () => {
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        tryLogIn(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        submitForm()
    }

    const checkKeyNSubmit = ({ key }) => {
        if (key === 'Enter') {
            submitForm()
        }
    }

    return (
        <form className = "user-forms" onKeyPress = { checkKeyNSubmit }>
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
            {/* <input type="submit" value="Sign In" /> */}
            <div onClick = { handleSubmit } className = "button-container">
                <div className = "shifting-container">
                    <div className = "first">Sign In</div>
                    <div className = "second">
                        <Arrow />
                    </div>
                </div>
            </div>
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