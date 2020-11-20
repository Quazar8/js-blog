import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import DefaultNavLinks from './DefaultNavLinks'
import LoggedNavLinks from './LoggedNavLinks'

import { logoutUser } from '../store/userActions'

const NavbarView = ({ username, online,
                        tryLogoutUser }) => {
    return (
        <nav className="main-navbar">
            <div className="logo-holder">
                <Link to="/">Logo</Link>
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