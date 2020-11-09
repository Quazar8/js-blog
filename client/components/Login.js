import React, { useState } from 'react'
import { assignVals } from '../utils'

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
    return (
        <form>
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