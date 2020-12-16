import React from 'react'

import UserBlock from './UserBlock'

const UserLink = 
    ({ username, profilePic, tryLogoutUser }) => {
    return (
        <div className = "user-link-container">
            <div className = "user-nav-link">
                <div className = "image-container">
                    <img src= { profilePic } alt="user picture" />
                </div>
            </div>
                <UserBlock 
                    tryLogoutUser = { tryLogoutUser }
                    username = { username }
                />
        </div>
    )
}

export default UserLink