import React from 'react'

const Profile = ({ user }) => {
    if (!user) {
        return <h1>Can not display profile page</h1>
    }

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