import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import DefaultNavLinks from './DefaultNavLinks'
import LoggedNavLinks from './LoggedNavLinks'

const NavbarView = ({ username, online }) => {
    return (
        <nav className="main-navbar">
            <div className="logo-holder">
                <Link to="/">Logo</Link>
            </div>
            {   
                online
                ? <LoggedNavLinks
                    username = { username }
                   />
                : <DefaultNavLinks />
           }
        </nav>
    )
}

const mapState = (state) => {
    return {
        username: state.user.username,
        online: state.user.online
    }
}

const Navbar = connect(mapState)(NavbarView)

export default Navbar