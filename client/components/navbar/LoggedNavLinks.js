import React from 'react'
import { Link } from 'react-router-dom'

import CreatePostLink from './CreatePostLink'

const LoggedNavLinks = ( { username,
                            tryLogoutUser }) => {
    return (
        <div className="links-container">
            <CreatePostLink />
            <h3>Hi, { username }</h3>
            <h3 onClick= { tryLogoutUser }>Log out</h3>
        </div>
    )
}

export default LoggedNavLinks