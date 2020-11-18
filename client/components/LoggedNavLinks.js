import React from 'react'
import { Link } from 'react-router-dom'

const LoggedNavLinks = ( { username,
                            logoutUser }) => {
    return (
        <div className="links-container">
            <Link to = "/post"
             className = "nav-links">
                 New Post
             </Link>
            <h3>Hi, { username }</h3>
            <h3 onClick= { logoutUser }>Log out</h3>
        </div>
    )
}

export default LoggedNavLinks