import React from 'react'

const LoggedNavLinks = ( { username }) => {
    return (
        <div className="links-container">
            <h3>Hi, { username }</h3>
            <a>Log out</a>
        </div>
    )
}

export default LoggedNavLinks