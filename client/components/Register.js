import React, { createRef } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../store/userActions'

const RegisterView = ({ dispatchRegister }) => {
    let usernameRef = createRef('')
    let passwordRef = createRef('')
    let confirmPassRef = createRef('')

    const handleSubmit =  (e) => {
        e.preventDefault()
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        dispatchRegister(data)
    }

    return (
        <form className = "user-forms" onSubmit = { handleSubmit }>
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
            <input type = "submit" value = "Register"/>
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