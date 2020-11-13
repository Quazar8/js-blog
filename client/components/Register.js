import React, { useState } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../store/userActions'
import { assignVals } from '../utils'

const RegisterView = ({ dispatchRegister }) => {
    const [inputs, setInputs] = useState({
        username:"",
        password:"",
        confirmPass:""
    })

    const handleChange = (e) => {
        const el = e.target
        switch(el.id) {
            case "username":
                setInputs(assignVals(inputs, 
                    "username", el.value)); break;
            case "password":
                setInputs(assignVals(inputs, 
                    "password", el.value)); break;
            case "confirm-pass":
                setInputs(assignVals(inputs, 
                    "confirmPass", el.value)); break;
            default: break;
        }
    }

    const handleSubmit =  (e) => {
        e.preventDefault()
        const data = {
            username: inputs.username,
            password: inputs.password
        }

        dispatchRegister(data)
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className="field-container">
                <label for="username">Username:</label>
                <input type="text" id="username" 
                onChange = { handleChange }
                value = { inputs.username }/>
            </div>
            <div className="field-container">
                <label for="password">Password:</label>
                <input type="password" id="password" 
                onChange = { handleChange }
                value = { inputs.password }/> 
            </div>
            <div className="field-container">
                <label for="confirm-pass">Confirm Password:</label>
                <input type="password" id="confirm-pass" 
                onChange = { handleChange }
                value = { inputs.confirmPass }/> 
            </div>
            <input type="submit" value="Register"/>
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