import React from 'react'
import { Link } from "react-router-dom";

import UserSvg from '../svgs/UserSvg'

const DefaultUserMenu = () => {
    return (
        <div className = "default-user-menu-container">
            <div className = "default-user-menu">
                <UserSvg />
                <ul>
                    <Link to = "/login">
                        <li>Login</li>
                    </Link>
                    <Link to = "/register">
                        <li>Register</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default DefaultUserMenu
