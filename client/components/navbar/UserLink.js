import React, { useState } from 'react'

import UserBlock from './UserBlock'

const UserLink = 
    ({ username, profilePic, tryLogoutUser }) => {

    const [showBlock, setShowBlock] = useState(false)
    
    const toggleBlock = () => {
        setShowBlock(!showBlock)
    }

    return (
        <div
        className = "user-link-container">
            <div onClick = { toggleBlock } className = "user-nav-link">
                <div className = "image-container">
                    <img src= { profilePic } alt="user picture" />
                </div>
            </div>
                <UserBlock
                    tryLogoutUser = { tryLogoutUser }
                    username = { username }
                    show = { showBlock }
                />
        </div>
    )
}

export default UserLink