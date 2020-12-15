import React from 'react'

const Logo = () => {
    return (
        <svg viewBox="0 0 100 100" width="100%">
            <circle cx="50" cy="50" r="8" fill="lightblue" />
            <ellipse cx="50" cy="50" rx="45" ry="17" stroke="lightblue"
                    fill="none" stroke-width="3.5"/>
            <ellipse cx="50" cy="50" rx="45" ry="17" stroke="lightblue"
                    fill="none" stroke-width="3.5"
                    transform="rotate(60 50 50)"/>
            <ellipse cx="50" cy="50" rx="45" ry="17" stroke="lightblue"
                    fill="none" stroke-width="3.5"
                    transform="rotate(120 50 50)"/>
        </svg>
    )
}

export default Logo