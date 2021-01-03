import React from 'react'
import { connect } from 'react-redux'

const ProfileView = ({ user }) => {
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

const mapState = store => ({
    user: store.user.user
})

const Profile = connect(mapState)(ProfileView)

export default Profile