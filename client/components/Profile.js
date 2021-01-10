import React, { useState, useEffect } from 'react'

const Profile = () => {
    const [user, setUser] = useState({
        username: '',
        profilePic: ''
    })

    const { profilePic, username } = user
    return (
        <section className = "profile-page">
            <div className = "image-container">
                <img src = { profilePic } alt = "profile picture" />
            </div>
            <h2>{ username }</h2>
        </section>
    )
}

export default Profile