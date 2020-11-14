import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../store/userActions'
import { assignVals } from '../utils'

const LoginView = ({ tryLogIn }) => {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
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
            default: break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            username: inputs.username,
            password: inputs.password
        }

        tryLogIn(data)
    }    

    return (
        <form onSubmit={ handleSubmit }>
            <div className="field-container">
                <label for="username">Usernamae:</label>
                <input id="username" type="text"
                    onChange = { handleChange } 
                    value = { inputs.username }
                 />
            </div>
            <div className="field-container">
                <label for="password">Password:</label>
                <input id="password" type="password" 
                    onChange = { handleChange }
                    value = { inputs.password }
                />
            </div>
            <input type="submit" value="Log In" />
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