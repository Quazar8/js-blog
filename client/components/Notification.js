import React, { useRef, useEffect } from 'react'
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
    const prevLengthRef = useRef(notifications.length)
    useEffect(() => {
        prevLengthRef.current = notifications.length
    })
    const prevLength = prevLengthRef.current

    const mapNotifications = (el, i) => {
        let key = Math.random()
        let appendClass = ""
        if (prevLength < notifications.length) {
            appendClass = i === notifications.length - 1
                                ? "appear"
                                : "moveDown"
        }

        if (el.error) {
            return  <Error key = { key } msg = { el.msg + i } 
                    appendClass = { appendClass }
                    />
        }
        
        return  <Success key = { key } msg = { el.msg } 
                    appendClass = { appendClass }
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