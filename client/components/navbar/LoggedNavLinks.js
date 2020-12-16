import React from 'react'

import CreatePostLink from './CreatePostLink'
import UserLink from './UserLink'

const LoggedNavLinks = 
    ({ username, tryLogoutUser, profilePic }) => {
    return (
        <div className="links-container">
            <CreatePostLink />
            <UserLink 
                tryLogoutUser = { tryLogoutUser }
                username = { username } 
                profilePic = { profilePic }
            />
        </div>
    )
}

export default LoggedNavLinks