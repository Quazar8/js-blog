import React, { useState } from 'react'
import { assignVals } from '../utils'
import { loginUser } from '../api'

const Login = () => {
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

        loginUser(data)
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
                <input id="password" type="text" 
                    onChange = { handleChange }
                    value = { inputs.password }
                />
            </div>
            <input type="submit" value="Log In" />
        </form>
    )
}

export default Login