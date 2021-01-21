import React from 'react'
import { connect } from "react-redux";

import NotFound from './NotFound'

const PrivateRouteView = ({ online, Child, otherProps }) => {
    if (!online) {
        return <NotFound />
    }
    console.log('otherProps', otherProps)
    return (
        <Child />
    )
}

const mapState = (state, { child, ...otherProps }) => {
    return {
        Child: child,
        online: state.user.online,
        otherProps
    }
}

const PrivateRoute = connect(mapState)(PrivateRouteView)

export default PrivateRoute