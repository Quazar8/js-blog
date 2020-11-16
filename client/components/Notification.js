import React from 'react'
import { connect } from 'react-redux'

const NotificationView = ({errorMsg, successMsg}) => {
    return (
        <h2>{errorMsg || successMsg }</h2>
    )
}

const mapState = state => {
    return {
        errorMsg: state.global.error,
        successMsg: state.global.success
    }
}

const Notification = connect(mapState)(NotificationView)

export default Notification