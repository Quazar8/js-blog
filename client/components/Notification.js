import React from 'react'
import { connect } from 'react-redux'

const Success = ( { msg, appendClass }) => {
    return (
        <div className = { "success-notification " + appendClass }>
            <div className = "message">
                { msg }
            </div>
            <div className = "mark">
                &#10004;
            </div>
        </div>
    )
}

const Error = ( { msg, appendClass }) => {
    return (
        <div className = {"error-notification " + appendClass}>
            <div className = "message">
                { msg }
            </div>
            <div className = "mark">
                X
            </div>
        </div>
    )
}

const NotificationView = ({ notifications }) => {
    const mapNotifications = (el, i) => {
        if (el.error) {
            return  <Error key = { Math.random() } msg = { el.msg + i } 
                    appendClass = { i === notifications.length - 1
                                    ? "appear"
                                    : "moveDown" }
                    />
        }
        
        return  <Success key = { Math.random() } msg = { el.msg } 
                    appendClass = { i === notifications.length - 1
                                    ? "appear"
                                    : "moveDown" }
                />
    }
    return (
        <section className = "notification-container">
            {   
                notifications.length > 0 
                ? notifications.map(mapNotifications)
                  .reverse()
                : null 
            }
        </section>
    )
}

const mapState = state => {
    return {
        notifications: state.global.notifications
    }
}

const Notification = connect(mapState)(NotificationView)

export default Notification