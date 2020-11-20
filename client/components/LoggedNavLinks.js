import React from 'react'
import { Link } from 'react-router-dom'

const LoggedNavLinks = ( { username,
                            tryLogoutUser }) => {
    return (
        <div className="links-container">
            <Link to = "/post"
             className = "nav-links">
                 New Post
             </Link>
            <h3>Hi, { username }</h3>
            <h3 onClick= { tryLogoutUser }>Log out</h3>
        </div>
    )
}

export default LoggedNavLinks