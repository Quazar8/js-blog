import React from 'react'

const Register = () => {
    return (
        <form>
            <div className="field-container">
                <label for="username">Username:</label>
                <input type="text" id="username" />
            </div>
            <div className="field-container">
                <label for="pass">Password:</label>
                <input type="text" id="pass" /> 
            </div>
            <input type="submit" value="Register"/>
        </form>
    )
}

export default Register