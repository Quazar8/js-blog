import React from 'react'

import CreatePostLink from './CreatePostLink'
import UserLink from './UserLink'

const LoggedNavLinks = 
    ({ username, tryLogoutUser, profilePic }) => {
    return (
        <div className="links-container">
            <CreatePostLink />
            <UserLink username = { username } 
                profilePic = { profilePic }
            />
            <h3 onClick= { tryLogoutUser }>Log out</h3>
        </div>
    )
}

export default LoggedNavLinks