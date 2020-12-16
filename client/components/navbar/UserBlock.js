import React from "react"
import { Link } from "react-router-dom";

const UserBlock = 
    ({ username, tryLogoutUser }) => {
    return (
        <div className="user-block">
            <h4>{ username }</h4>
            <ul>
                <li>
                    <Link>Profile</Link>
                </li>
                <li onClick = { tryLogoutUser }>
                    Log out
                </li>
            </ul>
        </div>
    )
}

export default UserBlock