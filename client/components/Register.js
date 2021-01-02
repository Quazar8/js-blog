import React, { createRef } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../store/userActions'

const RegisterView = ({ dispatchRegister }) => {
    let usernameRef = createRef()
    let passwordRef = createRef()
    let confirmPassRef = createRef()

    const submitForm = () => {
        const data = {
            username: usernameRef.current.value.trim(),
            password: passwordRef.current.value.trim()
        }

        dispatchRegister(data)
        usernameRef.current.value = ''
        passwordRef.current.value = ''
        confirmPassRef.current.value = ''
    }

    const submitIfEnter = ({ key }) => {
        if (key === 'Enter') {
            submitForm()
        }
    }

    return (
        <form className = "user-forms" onKeyPress = { submitIfEnter }>
            <h2>Register:</h2>
            <div className = "field-container">
                <label htmlFor = "username">Username:</label>
                <input type = "text" id = "username" 
                    ref = { usernameRef }
                    autoFocus
                    autoComplete = "off"
                />
            </div>
            <div className = "field-container">
                <label htmlFor = "password">Password:</label>
                <input type = "password" id = "password"
                    ref = { passwordRef }
                />
            </div>
            <div className = "field-container">
                <label htmlFor = "confirm-pass">Confirm Password:</label>
                <input type = "password" id = "confirm-pass" 
                    ref = { confirmPassRef }
                />
            </div>
            <div onClick = { submitForm } className = "button-container">
                <div className = "shifting-container">
                    <div className = "first">Sign Up</div>
                    <div className = "second">
                        Go!
                    </div>
                </div>
            </div>
        </form>
    )
}

const mapDispatch = dispatch => ({
    dispatchRegister: data => {
        dispatch(registerUser(data))
    }
})

const Register = connect(null, mapDispatch)(RegisterView)

export default Register