import React from 'react'
import { Link } from 'react-router-dom'

import DefaultUserMenu from './DefaultUserMenu'

const DefaultNavLinks = () => {
    return (
        <div className = "links-container">
            <DefaultUserMenu />
            <div className = "default-user-links">
                <Link className = "nav-links" to = "/login">Login</Link>
                <Link className = "nav-links" to = "/register">Register</Link>
            </div>
        </div>
    )
}

export default DefaultNavLinks