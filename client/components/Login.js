import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../store/userActions'

import Arrow from './svgs/Arrow'

const LoginView = ({ tryLogIn, isOnline }) => {
    let usernameRef = useRef()
    let passwordRef = useRef()

    useEffect(() => {
        if (isOnline) {
            usernameRef.current.value = ''
            passwordRef.current.value = ''
        }
    }, [isOnline])

    const submitForm = () => {
        const data = {
            username: usernameRef.current.value.trim(),
            password: passwordRef.current.value.trim()
        }

        tryLogIn(data)
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
            <div onClick = { submitForm } className = "button-container">
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

const mapState = store => ({
    isOnline: store.user.online
})

const mapDispatch = dispatch => ({
    tryLogIn: (data) => {
        dispatch(loginUser(data))
    }
})

const Login = connect(mapState, mapDispatch)(LoginView)

export default Login