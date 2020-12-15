import React from 'react'
import { Link } from 'react-router-dom'

import CreatePostLink from './CreatePostLink'
import UserLink from './UserLink'

const LoggedNavLinks = 
        ({ username, tryLogoutUser }) => {
    return (
        <div className="links-container">
            <CreatePostLink />
            <UserLink username = { username } />
            <h3 onClick= { tryLogoutUser }>Log out</h3>
        </div>
    )
}

export default LoggedNavLinks