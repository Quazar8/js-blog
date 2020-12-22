import React from 'react'

const UserSvg = () => {
    return (
        <svg viewBox = "0 0 50 50">
            <path d = {
                `M 10 45
                c0,0 0,-20 15,-20
                M 40 45
                c0,0 0,-20 -15,-20` 
            }/>
            <polygon points = "11,44 25,26 39,44"/>
            <circle cx="25" cy="13" r="7"/>
        </svg>
    )
}

export default UserSvg