import React from 'react'

const Login = () => {
    return (
        <form>
            <div className="field-container">
                <label for="username">Usernamae:</label>
                <input id="username" type="text" />
            </div>
            <div className="field-container">
                <label for="password">Usernamae:</label>
                <input id="password" type="text" />
            </div>
            <input type="submit" value="Log In" />
        </form>
    )
}

export default Login