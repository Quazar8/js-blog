import React from 'react'
import { connect } from 'react-redux'

import DefaultNavLinks from './DefaultNavLinks'
import LoggedNavLinks from './LoggedNavLinks'
import Logo from './Logo'

import { logoutUser } from '../store/userActions'

const NavbarView = ({ username, online,
                        tryLogoutUser }) => {
    return (
        <nav className="main-navbar">
            <div className="logo-container">
                <Logo />
            </div>
            {   
                online
                ? <LoggedNavLinks
                    username = { username }
                    tryLogoutUser = { tryLogoutUser }
                   />
                : <DefaultNavLinks />
           }
        </nav>
    )
}

const mapState = state => {
    return {
        username: state.user.username,
        online: state.user.online
    }
}

const mapDispatch = dispatch => {
    return {
        tryLogoutUser: () => {
            dispatch(logoutUser())
        }
    }
}

const Navbar = connect(mapState, mapDispatch)(NavbarView)

export default Navbar