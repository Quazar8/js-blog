import React, { useState } from 'react'
import { Link } from "react-router-dom";

import UserSvg from '../svgs/UserSvg'
import Triangle from '../svgs/Triangle'

const DefaultUserMenu = () => {
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <div className = "default-user-menu-container">
            <div onClick = { toggleMenu } className = "default-user-menu">
                <UserSvg />
                { showMenu 
                  ? <ul>
                        <Triangle />
                        <Link to = "/login">
                            <li>Login</li>
                        </Link>
                        <Link to = "/register">
                            <li>Register</li>
                        </Link>
                    </ul>
                    : null
                }   
            </div>
        </div>
    )
}

export default DefaultUserMenu
