import React from 'react'

const Profile = ({ user }) => {
    if (!user) {
        return <h1>Can not display profile page</h1>
    }

    return (
        <h1>Profile component</h1>
    )
}

export default Profile