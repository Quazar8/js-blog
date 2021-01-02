import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../store/userActions'

const RegisterView = ({ dispatchRegister, isOnline }) => {
    let usernameRef = useRef()
    let passwordRef = useRef()
    let confirmPassRef = useRef()

    useEffect(() => {
        if (isOnline) {
            usernameRef.current.value = ''
            passwordRef.current.value = ''
            confirmPassRef.current.value = ''
        }
    }, [isOnline])

    const submitForm = () => {
        const data = {
            username: usernameRef.current.value.trim(),
            password: passwordRef.current.value.trim()
        }

        dispatchRegister(data)
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

const mapState = store => ({
    isOnline: store.user.online
})

const mapDispatch = dispatch => ({
    dispatchRegister: data => {
        dispatch(registerUser(data))
    }
})

const Register = connect(mapState, mapDispatch)(RegisterView)

export default Register