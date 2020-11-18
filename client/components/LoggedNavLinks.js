import React from 'react'

const LoggedNavLinks = ( { username,
                            logoutUser }) => {
    return (
        <div className="links-container">
            <h3>Hi, { username }</h3>
            <h3 onClick= { logoutUser }>Log out</h3>
        </div>
    )
}

export default LoggedNavLinks