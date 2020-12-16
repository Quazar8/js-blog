import React from "react"

const UserBlock = 
    ({ username, tryLogoutUser }) => {
    return (
        <div className="user-block">
            <h4>{ username }</h4>
            <ul>
                <li onClick = { tryLogoutUser }>
                    Log out
                </li>
            </ul>
        </div>
    )
}

export default UserBlock