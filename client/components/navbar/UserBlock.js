import React from "react"

const UserBlock = 
    ({ tryLogoutUser }) => {
    return (
        <div className="user-block">
            <ul>
                <li onClick = { tryLogoutUser }>
                    Log out
                </li>
            </ul>
        </div>
    )
}

export default UserBlock