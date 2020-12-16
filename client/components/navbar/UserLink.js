import React from 'react'

import UserBlock from './UserBlock'

const UserLink = ({ username, profilePic }) => {
    return (
            <div className = "nav-links user-nav-link">
                <div className = "image-container">
                    <img src= { profilePic } alt="user picture" />
                </div>
                <UserBlock />
            </div>
    )
}

export default UserLink