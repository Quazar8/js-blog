import React from 'react'

const UserLink = ({ username, profilePic }) => {
    return (
            <div className = "nav-links user-nav-link">
                <div className = "image-container">
                    <img src= { profilePic } alt="user picture" />
                </div>
            </div>
    )
}

export default UserLink